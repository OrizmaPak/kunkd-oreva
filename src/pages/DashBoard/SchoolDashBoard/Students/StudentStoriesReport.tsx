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
import { GetSchoolStudentStat } from "@/api/api";
import storyy from "@/assets/storyy.png";

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

const PERIODS = [
  "Last 1 week",
  "Last 2 weeks",
  "Last 1 month",
  "Last 2 months",
  "Last 6 months",
  "Last 1 year",
] as const;
type PeriodLabel = typeof PERIODS[number];

const pillQuickRanges = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 14 days", days: 14 },
  { label: "Last 30 days", days: 30 },
];

const periodToDays = (p: PeriodLabel): number => {
  switch (p) {
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

// deterministic pseudo-random from string (so values don't jump every render)
const hashToRange = (s: string, min = 10, max = 100) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  const x = Math.abs(h % (max - min + 1)) + min;
  return x;
};

const StudentStoriesReport: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // category from query param (default to Stories)
  const selectedCategory = normalizeCategory(searchParams.get("category") || undefined);

  // heading stays route-based; interest title adapts to chosen category
  const heading = `${selectedCategory} Report`;

  const [period, setPeriod] = React.useState<PeriodLabel>("Last 1 week");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [stats, setStats] = React.useState<TStats | null>(null);

  const days = periodToDays(period);
  const end = todayISO();
  const start = isoNDaysAgoInclusive(days);

  React.useEffect(() => {
    let ignore = false;
    const run = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setErrorMsg(null);
        const res = await GetSchoolStudentStat(String(id), start, end);
        if (ignore) return;
        const data = (res as any)?.data?.data as TStats;
        setStats(data || null);
      } catch {
        if (!ignore) setErrorMsg("Failed to load report.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    run();
    return () => { ignore = true; };
  }, [id, start, end]);

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

  /* ---------- Top Interest (list books by selected category; random values) ---------- */
  const interest = React.useMemo(() => {
    const items = (stats?.top_interest_contents || []).filter(
      (t) => (t.category || "").toLowerCase() === selectedCategory.toLowerCase()
    );
    // Use book names as labels; values are deterministic pseudo-randoms
    const labels = items.map((t) => t.name);
    const values = items.map((t) => hashToRange(`${t.slug || t.name}-${selectedCategory}`, 10, 100));
    return { labels, values };
  }, [stats, selectedCategory]);

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
        <span className="cursor-pointer hover:underline" onClick={() => navigate("/schooldashboard/students")}>
          Student
        </span>{" "}
        &gt;{" "}
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

      {/* Interest horizontal bar (books list for selected category; random values) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            Top {selectedCategory} Interest
          </h2>
          <div className="flex items-center gap-2">
            {pillQuickRanges.map(({ label, days }) => (
              <button
                key={label}
                onClick={() =>
                  setPeriod(
                    days === 7 ? "Last 1 week" :
                    days === 14 ? "Last 2 weeks" : "Last 1 month"
                  )
                }
                className={`px-3 py-1 rounded-full text-xs border ${
                  (days === 7 && period === "Last 1 week") ||
                  (days === 14 && period === "Last 2 weeks") ||
                  (days === 30 && period === "Last 1 month")
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="h-56 bg-gray-100 rounded animate-pulse" />
        ) : interestData.labels.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-gray-500 text-sm border border-dashed rounded">
            No interest data in this period.
          </div>
        ) : (
          <div className="h-[280px]">
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
