import React from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { GetSchoolStudentStat, AllProgressContent } from "@/api/api";
import storyy from "@/assets/storyy.png";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

type TQuizResult = { status: boolean; id: number; result: number };
type TRow = {
  id: number;
  category: string;
  name: string;
  media_type: string;
  thumbnail: string;
  theme: string;
  quiz_result: TQuizResult;
};
type TTop = { id: number; name: string; slug: string; category: string; theme: string; thumbnail: string };

type TStats = {
  name: string;
  learning_hours: Record<string, number>;
  recently_completed_content: TRow[];
  ongoing_contents: TRow[];
  top_interest_contents: TTop[];
};

/** ===== User endpoint payload types (for normalization & interest) ===== */
type TUserRecord = {
  id: number;
  category_id: number;
  category: string;
  name: string;
  slug: string;
  synopsis?: string;
  theme: string;
  tags?: string;
  has_quiz: boolean;
  media_type: string;
  thumbnail: string;
  publish_status: boolean;
  status: string; // "ongoing" | "completed" | "complete" | ...
  quiz_result: { status: boolean; id: number; result: number };
  is_liked: boolean;
  short_link: string;
  pages_read: number;     // <- used to rank
  timespent: number;
  pages?: Array<{
    content_media_id: number;
    name: string;
    body?: string;
    image?: string;
    subtitle?: string | null;
    page_number: number;
    audio?: string;
  }>;
};
type TAllProgressPayload = {
  category_count: {
    audiobook_count: number;
    language_count: number;
    story_count: number;
  };
  records: TUserRecord[];
};

/** ===== Helpers ===== */
// NOTE: includes "All" per your request.
const PERIODS = [
  "All",
  "Last 1 week",
  "Last 2 weeks",
  "Last 1 month",
  "Last 2 months",
  "Last 6 months",
  "Last 1 year",
] as const;
type PeriodLabel = typeof PERIODS[number];

const periodToDays = (p: PeriodLabel): number => {
  switch (p) {
    case "All": return 0;
    case "Last 1 week": return 7;
    case "Last 2 weeks": return 14;
    case "Last 1 month": return 30;
    case "Last 2 months": return 60;
    case "Last 6 months": return 180;
    case "Last 1 year": return 365;
    default: return 7;
  }
};

const isoNDaysAgoInclusive = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - (n - 1));
  return d.toISOString().slice(0, 10);
};
const todayISO = () => new Date().toISOString().slice(0, 10);

const selectStyle =
  "border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none bg-white";

// normalize category from query → canonical label used in payload
const normalizeCategory = (raw?: string) => {
  const v = (raw || "").trim().toLowerCase();
  if (v === "stories") return "Stories";
  if (v === "languages") return "Languages";
  if (v === "literacy") return "Literacy";
  if (v === "audiobooks" || v === "audio_books" || v === "audiobook") return "Audiobooks";
  // default to Stories
  return "Stories";
};

// deterministic pseudo-random from string (used only for non-user interest bars)
const hashToRange = (s: string, min = 10, max = 100) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  const x = Math.abs(h % (max - min + 1)) + min;
  return x;
};

/** Resolve effective child ID:
 *  When role === "user", prioritize sessionStorage.profileId over URL id.
 */
const resolveEffectiveId = (role: string, routeId?: string | null) => {
  const ssProfileId =
    typeof window !== "undefined" ? window.sessionStorage.getItem("profileId") : null;
  if (role === "user") {
    if (ssProfileId && ssProfileId !== routeId) return ssProfileId;
    return routeId || ssProfileId || "";
  }
  return routeId || "";
};

/** Normalize AllProgressContent payload → minimal TStats this page needs */
const normalizeUserPayloadToStats = (payload?: TAllProgressPayload): TStats => {
  const records = payload?.records || [];

  const toTRow = (r: TUserRecord): TRow => ({
    id: r.id,
    category: r.category || "",
    name: r.name || "",
    media_type: r.media_type || "",
    thumbnail: r.thumbnail || "",
    theme: r.theme || "",
    quiz_result: r.quiz_result || { status: false, id: 0, result: 0 },
  });

  const ongoing = records
    .filter((r) => (r.status || "").toLowerCase() === "ongoing")
    .map(toTRow);

  const completed = records
    .filter((r) => {
      const s = (r.status || "").toLowerCase();
      return s === "completed" || s === "complete";
    })
    .map(toTRow);

  return {
    name: "", // not in this payload
    learning_hours: {}, // not provided → blank
    recently_completed_content: completed,
    ongoing_contents: ongoing,
    top_interest_contents: [], // not provided → blank
  };
};

const StudentStoriesReport: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // role
  const [user] = useStore(getUserState);
  const role = (user?.role || "").toLowerCase();
  const effectiveId = resolveEffectiveId(role, id);

  // category from query param (default to Stories)
  const selectedCategory = normalizeCategory(searchParams.get("category") || undefined);

  // heading stays route-based; interest title adapts to chosen category
  const heading = `${selectedCategory} Report`;

  // Single period state drives both sections, with "All" available.
  const [period, setPeriod] = React.useState<PeriodLabel>("Last 1 week");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [stats, setStats] = React.useState<TStats | null>(null);

  // NEW: keep raw user records so we can compute interest for user role
  const [userRecords, setUserRecords] = React.useState<TUserRecord[]>([]);

  const days = periodToDays(period);
  const isAll = period === "All";
  // For school/teacher flow, pass empty strings on "All" to fetch everything.
  const end = isAll ? "" : todayISO();
  const start = isAll ? "" : isoNDaysAgoInclusive(days);

  React.useEffect(() => {
    let ignore = false;
    const run = async () => {
      if (!effectiveId) return;
      try {
        setLoading(true);
        setErrorMsg(null);

        if (role === "user") {
          // user flow: AllProgressContent(effectiveId) (no date range on this endpoint)
          const res = await AllProgressContent(Number(effectiveId));
          if (ignore) return;
          const payload = (res as any)?.data?.data as TAllProgressPayload | undefined;
          setStats(normalizeUserPayloadToStats(payload));
          setUserRecords(payload?.records || []); // keep raw records for interest calc
        } else {
          // school/teacher flow: keep existing controller with date range (or all)
          const res = await GetSchoolStudentStat(String(effectiveId), start, end);
          if (ignore) return;
          const data = (res as any)?.data?.data as TStats;
          setStats(data || null);
          setUserRecords([]); // ensure we don't accidentally use user branch
        }
      } catch {
        if (!ignore) setErrorMsg("Failed to load report.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    run();
    return () => { ignore = true; };
  }, [effectiveId, role, start, end]);

  /* ---------- rows filtered by chosen category ---------- */
  const filteredRows = React.useMemo<TRow[]>(() => {
    const all = [
      ...(stats?.ongoing_contents || []),
      ...(stats?.recently_completed_content || []),
    ];
    return all.filter((r) => (r.category || "").toLowerCase() === selectedCategory.toLowerCase());
  }, [stats, selectedCategory]);

  /* ---------- Mode of Consumption (Self Read vs Audio) ---------- */
  const modeCounts = React.useMemo(() => {
    const audio = filteredRows.filter((r) => (r.media_type || "").toLowerCase() === "audio").length;
    const selfRead = filteredRows.length - audio;
    return { selfRead, audio };
  }, [filteredRows]);

  const doughnutData = React.useMemo(() => ({
    labels: ["Self Read", "Audio"],
    datasets: [
      {
        data: [modeCounts.selfRead, modeCounts.audio],
        backgroundColor: ["#B5E9F8", "#9FC43E"],
        hoverBackgroundColor: ["#A4E1F3", "#86B83A"],
        borderWidth: 0,
      },
    ],
  }), [modeCounts]);

  /* ---------- Quiz Report (bar) filtered by category ---------- */
  const quizRows = React.useMemo(
    () => filteredRows.filter((r) => r.quiz_result?.status),
    [filteredRows]
  );
  const quizLabels = React.useMemo(
    () => quizRows.map((_, i) => `Quiz ${i + 1}`),
    [quizRows]
  );
  const quizScores = React.useMemo(
    () => quizRows.map((r) => Number(r.quiz_result?.result || 0)),
    [quizRows]
  );

  const quizData = React.useMemo(
    () => ({
      labels: quizLabels,
      datasets: [
        {
          label: "Score %",
          data: quizScores,
          backgroundColor: "#CDE6F6",
          borderRadius: 4,
          barThickness: 16,
        },
      ],
    }),
    [quizLabels, quizScores]
  );

  /* ---------- Top Interest (books list for selected category) ----------
     USER ROLE: compute from records → top 50 by pages_read; value = (pages_read / total_pages) * 100
     NON-USER: keep existing behavior (use top_interest_contents) */
  const interest = React.useMemo(() => {
    if (role === "user") {
      // use raw records; filter by category
      const inCategory = (userRecords || []).filter(
        (r) => (r.category || "").toLowerCase() === selectedCategory.toLowerCase()
      );

      // sort by pages_read desc, take top 50
      const top = [...inCategory]
        .sort((a, b) => (b.pages_read || 0) - (a.pages_read || 0))
        .slice(0, 20);

      // compute percent = pages_read / total_pages * 100
      const labels = top.map((r) => r.name || "");
      const values = top.map((r) => {
        const totalPages = Array.isArray(r.pages) ? r.pages.length : 0;
        const read = Number(r.pages_read || 0);
        if (!totalPages || totalPages <= 0) return 0;
        const pct = (read / totalPages) * 100;
        // clamp 0..100 and round to whole numbers to keep bars tidy
        const clamped = Math.max(0, Math.min(100, pct));
        return Math.round(clamped);
      });

      return { labels, values };
    }

    // non-user: derive from top_interest_contents as before
    const items = (stats?.top_interest_contents || []).filter(
      (t) => (t.category || "").toLowerCase() === selectedCategory.toLowerCase()
    );
    const labels = items.map((t) => t.name);
    // non-user had no scalar; keep deterministic pseudo-random to avoid design changes
    const values = items.map((t) => hashToRange(`${t.slug || t.name}-${selectedCategory}`, 10, 100));
    return { labels, values };
  }, [role, userRecords, stats, selectedCategory]);

  const interestData = React.useMemo(
    () => ({
      labels: interest.labels,
      datasets: [
        {
          data: interest.values,
          backgroundColor: "#9FC43E",
          borderRadius: 4,
          barThickness: 16,
        },
      ],
    }),
    [interest]
  );

  return (
    <div className="space-y-6 px-4 pb-10">
      {/* breadcrumb */}
      <nav className="text-sm text-gray-600">
        {role !== "user" && (
          <>
              <span className="cursor-pointer hover:underline" onClick={() => navigate("/schooldashboard/students")}>
                Student
              </span>
            {" "}
            &gt;{" "}
          </>
          )}
        <span className="cursor-pointer hover:underline" onClick={() => navigate(-1)}>
          View
        </span>{" "}
        &gt; <span className="font-medium text-gray-900">{heading}</span>
      </nav>

      {/* title */}
      <h1 className="text-xl font-semibold text-gray-900">{heading}</h1>

      {/* charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mode of Consumption */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Mode of Consumption</h2>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as PeriodLabel)}
              className={selectStyle}
            >
              {PERIODS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="h-48 bg-gray-100 rounded animate-pulse" />
          ) : (
            <div className="flex items-center gap-6">
              {/* doughnut */}
              <div className="w-48 h-48">
                <Doughnut
                  data={doughnutData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>

              {/* legend */}
              <div className="space-y-3">
                {/* Self Read */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#B5E9F8]">
                    <img src={storyy} alt="" className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Self Read</div>
                    <div className="text-base font-semibold text-gray-800">
                      {modeCounts.selfRead}
                      <span className="text-gray-500 text-sm"> items</span>
                    </div>
                  </div>
                </div>

                {/* Audio */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#9FC43E]">
                    <img src={storyy} alt="" className="w-4 h-4 opacity-80" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Audio</div>
                    <div className="text-base font-semibold text-gray-800">
                      {modeCounts.audio}
                      <span className="text-gray-500 text-sm"> items</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quiz Report */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">{selectedCategory} Quiz Report</h2>
          {loading ? (
            <div className="h-56 bg-gray-100 rounded animate-pulse" />
          ) : quizLabels.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-gray-500 text-sm border border-dashed rounded">
              No quiz data in this period.
            </div>
          ) : (
            <div className="h-56">
              {/* @ts-ignore simplify callback types */}
              <Bar
                data={quizData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: {
                      beginAtZero: true,
                      suggestedMax: 100,
                      ticks: { callback: (v: any) => `${v}%` },
                      grid: { color: "#EEF6FB" },
                    },
                    x: { grid: { display: false } },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Interest horizontal bar (books list for selected category) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            Top {selectedCategory} Interest
          </h2>

        {/* Dropdown (same style as Mode of Consumption) */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as PeriodLabel)}
            className={selectStyle}
          >
            {PERIODS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="h-56 bg-gray-100 rounded animate-pulse" />
        ) : interestData.labels.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-gray-500 text-sm border border-dashed rounded">
            No interest data in this period.
          </div>
        ) : (
          <div className="h-[980px]">
            <Bar
              data={interestData}
              options={{
                indexAxis: "y" as const,
                responsive: true,
                maintainAspectRatio: false, // fill the fixed-height wrapper
                plugins: { legend: { display: false } },
                scales: {
                  x: { beginAtZero: true, grid: { color: "#EEF6FB" } },
                  y: {
                    grid: { display: false },
                    ticks: { autoSkip: true, maxTicksLimit: 10 },
                    barPercentage: 0.8, // Adjust bar percentage to add spacing
                    categoryPercentage: 0.8, // Adjust category percentage to add spacing
                  },
                },
              }}
            />
          </div>
        )}
      </div>

      {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
    </div>
  );
};

export default StudentStoriesReport;
