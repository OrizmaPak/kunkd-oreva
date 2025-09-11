// -------------------------------
// src/pages/StudentView.tsx
// -------------------------------
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressGraph from "@/components/ProgressGraph";
import StatCard from "@/components/StatCard";
import ContentTable, { ContentItem } from "@/components/ContentTable";
import child from "@/assets/child.png";
import useStore from "@/store/index";
import storyy from "@/assets/storyy.png";
import langg from "@/assets/langg.png";
import Teacers from "@/assets/Teachers.png";
import { AllProgressContent, GetSchoolStudentStat } from "@/api/api";
import { getUserState } from "@/store/authStore";

/** ===== Types from GetSchoolStudentStat payload ===== */
type TQuizResult = { status: boolean; id: number; result: number };
type TRow = {
  id: number;
  category_id: number;
  category: string;
  content_type_id: number;
  content_type: string;
  name: string;
  slug: string;
  synopsis: string;
  theme: string;
  tags: string;
  has_quiz: boolean;
  media_type: string;
  thumbnail: string;
  publish_status: boolean;
  quiz_result: TQuizResult;
  pages: any[];
  is_liked: boolean;
  short_link: string;
  pages_read: number;
  timespent: number; // minutes
};

type TStats = {
  avatar: string;
  class: string;
  content_progress_log: {
    audio_books: number;
    languages: number;
    quiz: number;
    stories: number;
  };
  learning_hours: Record<string, number>; // minutes keyed by YYYY-MM-DD
  name: string;
  ongoing_contents: TRow[];
  parent_email: string;
  recently_completed_content: TRow[];
  teacher_email: string;
  teacher_name: string;
  teacher_picture: string;
  top_interest_contents: { id: number; name: string; slug: string; category: string; theme: string; thumbnail: string }[];
  total_time_spent: number; // minutes
};

/** ===== Types for the `user` endpoint you provided ===== */
type TUserRecord = {
  id: number;
  category_id: number;
  category: string;
  name: string;
  slug: string;
  synopsis?: string;
  theme?: string;
  tags?: string;
  has_quiz: boolean;
  media_type: string;
  thumbnail: string;
  publish_status: boolean;
  status: string; // "ongoing" | "completed" | ...
  media?: {
    name: string; slug: string; order: number; file: string; thumbnail: string;
  }[];
  quiz_result: { status: boolean; id: number; result: number };
  is_liked: boolean;
  short_link: string;
  pages_read: number;
  timespent: number;
};

type TUserPayload = {
  category_count: {
    audiobook_count: number;
    language_count: number;
    story_count: number;
  };
  records: TUserRecord[];
};

/** ===== Utilities ===== */
const minutesToHMM = (mins?: number) => {
  const m = Math.max(0, Number(mins || 0));
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${h}:${mm < 10 ? `0${mm}` : mm}`;
};

const lastNDays = (n: number) => {
  const days: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
};

/** ===== Convert the `user` payload to the existing TStats shape (so UI & children stay identical) ===== */
const normalizeUserToStats = (p?: TUserPayload): TStats => {
  const records = p?.records ?? [];

  const toTRow = (r: TUserRecord): TRow => ({
    id: r.id,
    category_id: r.category_id,
    category: r.category || "",
    content_type_id: 0,
    content_type: r.media_type || "",
    name: r.name || "",
    slug: r.slug || "",
    synopsis: r.synopsis || "",
    theme: r.theme || "",
    tags: r.tags || "",
    has_quiz: !!r.has_quiz,
    media_type: r.media_type || "",
    thumbnail: r.thumbnail || "",
    publish_status: !!r.publish_status,
    quiz_result: r.quiz_result || { status: false, id: 0, result: 0 },
    pages: [],
    is_liked: !!r.is_liked,
    short_link: r.short_link || "",
    pages_read: Number(r.pages_read || 0),
    timespent: Number(r.timespent || 0),
  });

  const ongoing = records.filter((r) => String(r.status).toLowerCase() === "ongoing").map(toTRow);
  const completed = records.filter((r) => String(r.status).toLowerCase() === "completed").map(toTRow);
  const total_time_spent = records.reduce((acc, r) => acc + (Number(r.timespent) || 0), 0);

  // Build a 7-day zeroed series so ProgressGraph always gets valid arrays
  const days = lastNDays(7);
  const learning_hours: Record<string, number> = {};
  days.forEach((d) => (learning_hours[d] = 0));

  return {
    avatar: "",
    class: "",
    name: "",
    parent_email: "",
    teacher_email: "",
    teacher_name: "",
    teacher_picture: "",
    top_interest_contents: [],
    content_progress_log: {
      stories: p?.category_count?.story_count ?? 0,
      languages: p?.category_count?.language_count ?? 0,
      audio_books: p?.category_count?.audiobook_count ?? 0,
      quiz: 0,
    },
    learning_hours,
    ongoing_contents: ongoing,
    recently_completed_content: completed,
    total_time_spent,
  };
};

const StudentView: React.FC<{ crumb?: boolean }> = ({ crumb = true }) => {
  const { id: paramId } = useParams<{ id: string }>();
  const id = paramId || (typeof window !== "undefined" ? sessionStorage.getItem("profileId") : null);
  const navigate = useNavigate();

  /** ===== Data fetch ===== */
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [stats, setStats] = React.useState<TStats | null>(null);

  // last 7 days window (fixed)
  const today = new Date();
  const end = today.toISOString().slice(0, 10);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 6);
  const start = startDate.toISOString().slice(0, 10);

  /** Auth/user role */
  const [user] = useStore(getUserState);
  const role = (user?.role || "").toLowerCase();

  /** 
   * NEW: grab all profiles from the store root, tolerating different keys. 
   * This avoids importing specific selectors and keeps the UI stable.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profiles = useStore((s: any) => s.profiles ?? s.profile?.profiles ?? s.children ?? []);

  /** Find the active profile by id from sessionStorage/route */
  const activeProfile = React.useMemo(() => {
    if (!id) return undefined;
    const pid = String(id);
    // profiles can be number or string id—coerce both sides to string
    return (profiles as Array<any>).find((p) => String(p?.id) === pid);
  }, [id, profiles]);

  React.useEffect(() => {
    let ignore = false;
    const run = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setErrorMsg(null);

        if (role === "user") {
          // USER ROLE: call AllProgressContent and normalize to TStats (for table/cards/graph)
          const res = await AllProgressContent(Number(id));
          if (ignore) return;
          const payload = (res as any)?.data?.data as TUserPayload | undefined;
          setStats(normalizeUserToStats(payload));
        } else {
          // NON-USER ROLES: original endpoint
          const res = await GetSchoolStudentStat(String(id));
          if (ignore) return;
          const data = (res as any)?.data?.data as TStats | undefined;
          setStats({
            ...((data as TStats) || {
              avatar: "",
              class: "",
              content_progress_log: { audio_books: 0, languages: 0, quiz: 0, stories: 0 },
              learning_hours: {},
              name: "",
              ongoing_contents: [],
              parent_email: "",
              recently_completed_content: [],
              teacher_email: "",
              teacher_name: "",
              teacher_picture: "",
              top_interest_contents: [],
              total_time_spent: 0,
            }),
            ongoing_contents: data?.ongoing_contents ?? [],
            recently_completed_content: data?.recently_completed_content ?? [],
          });
        }
      } catch {
        if (!ignore) {
          setStats(null);
          setErrorMsg("Failed to load student stats.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, [id, start, end, role]);

  /** ===== Header values from stats (defaults) ===== */
  let student = {
    name: stats?.name || "—",
    email: stats?.parent_email || "—",
    avatarUrl: stats?.avatar || "",
    class: stats?.class || "—",
    timeHMM: minutesToHMM(stats?.total_time_spent),
  };

  let teacher = {
    name: stats?.teacher_name || "—",
    email: stats?.teacher_email || "—",
    avatarUrl: stats?.teacher_picture || "",
  };

  /**
   * NEW: profiles override for user role
   * If role is 'user' and we found the matching profile, we use it to populate:
   *  - student name, avatar, class
   *  - teacher name
   * This fills the missing header data when the user endpoint doesn't provide it.
   */
  if (role === "user" && activeProfile) {
    const s = activeProfile as {
      id: number | string;
      name?: string;
      image?: string;
      student?: {
        assigned_teacher_name?: string;
        class_name?: string;
        school_name?: string;
      };
    };
    student = {
      ...student,
      name: s?.name || student.name,
      avatarUrl: (s?.image && s.image.trim()) ? s.image : student.avatarUrl,
      class: s?.student?.class_name || student.class,
      // keep email as-is; profiles sample doesn't include parent email
    };
    teacher = {
      ...teacher,
      name: s?.student?.assigned_teacher_name || teacher.name,
      // teacher email not present in profiles sample; leave as-is
    };
  }

  const counts = stats?.content_progress_log || {
    stories: 0,
    languages: 0,
    audio_books: 0,
    quiz: 0,
  };

  /** ===== Graph data from learning_hours (convert minutes → hours) ===== */
  const graphLabels = React.useMemo(() => {
    const lh = stats?.learning_hours || {};
    const dates = Object.keys(lh).length ? Object.keys(lh).sort() : lastNDays(7);
    return dates.map((d) => new Date(d).toLocaleDateString(undefined, { weekday: "long" }));
  }, [stats]);

  const graphValues = React.useMemo(() => {
    const lh = stats?.learning_hours || {};
    const dates = Object.keys(lh).length ? Object.keys(lh).sort() : lastNDays(7);
    return dates.map((d) => Math.round((lh[d] || 0) / 60)); // hours
  }, [stats]);

  /** ===== Map API rows -> ContentItem ===== */
  const toContent = React.useCallback(
    (rows: TRow[], status: "Ongoing" | "Completed"): ContentItem[] =>
      (rows || []).map((r) => ({
        id: r.id,
        title: r.name || "",
        category: r.category || "",
        readType: "Self Read",
        dateAssigned: "—",
        dateStarted: "—",
        status,
        thumb: r.thumbnail || "",
      })),
    []
  );

  const tableData = React.useMemo<ContentItem[]>(
    () => [
      ...toContent(stats?.ongoing_contents ?? [], "Ongoing"),
      ...toContent(stats?.recently_completed_content ?? [], "Completed"),
    ],
    [stats, toContent]
  );

  return (
    <div className="space-y-8 pb-8 px-4 bg-transparent min-h-screen">
      {/* Breadcrumb */}
      {crumb && (
        <nav className="text-sm text-gray-600">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/schooldashboard/students")}
          >
            Student
          </span>{" "}
          &gt; <span className="font-medium text-gray-900">View</span>
        </nav>
      )}

      <h1 className="text-xl font-semibold relative -top-4 text-gray-900">
        Student info
      </h1>

      {/* Info cards (UI unchanged; skeletons while loading) */}
      <div className="grid gap-6 md:grid-cols-2 relative -top-4">
        <div className="bg-white border border-gray-200 rounded-3xl px-6 lg:px-8 py-8 lg:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center space-x-4">
            {loading ? (
              <>
                <div className="w-20 h-20 rounded-full bg-gray-100 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-5 w-40 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-56 bg-gray-100 rounded animate-pulse" />
                </div>
              </>
            ) : (
              <>
                <img
                  src={student.avatarUrl || child}
                  alt="Student Avatar"
                  className="w-20 rounded-full object-cover"
                />
                <div>
                  <p className="font-inter font-semibold text-gray-800 text-2xl leading-tight tracking-tight">
                    {student.name}
                  </p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
              </>
            )}
          </div>
          <div className="border-t lg:border-l lg:border-t-0 pt-4 lg:pt-0 lg:pl-6">
            {loading ? (
              <>
                <div className="h-4 w-14 bg-gray-100 rounded animate-pulse mb-2" />
                <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500">Class</p>
                <p className="text-lg font-semibold text-gray-800">{student.class}</p>
              </>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl px-6 lg:px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            {loading ? (
              <>
                <div className="h-4 w-20 bg-gray-100 rounded animate-pulse mb-2" />
                <div className="h-7 w-36 bg-gray-100 rounded animate-pulse" />
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500">Time spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {student.timeHMM} <span className="text-gray-500 text-sm font-medium">Minutes</span>
                </p>
              </>
            )}
          </div>
          <div className="border-t lg:border-l lg:border-t-0 pt-4 lg:pt-0 lg:pl-6 flex flex-col">
            {loading ? (
              <>
                <div className="h-4 w-14 bg-gray-100 rounded animate-pulse mb-2" />
                <div className="h-5 w-28 bg-gray-100 rounded animate-pulse mb-1" />
                <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500 relative top-1">Teacher</p>
                <p className="text-ms font-semibold text-gray-800">{teacher.name}</p>
                <p className="text-sm text-gray-500 relative -top-1">{teacher.email}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress report (graph fed with API values; skeleton while loading) */}
      <h2 className="text-xl font-semibold text-gray-900 mt-10">Progress report</h2>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="w-full h-[220px] rounded-2xl border border-gray-100 bg-gray-100 animate-pulse" />
          ) : (
            <ProgressGraph labels={graphLabels} values={graphValues} />
          )}
        </div>
        <div className="flex flex-col gap-4 w-full lg:max-w-xs mx-auto">
          {loading ? (
            <>
              <div className="h-20 rounded-xl border border-gray-100 bg-gray-100 animate-pulse" />
              <div className="h-20 rounded-xl border border-gray-100 bg-gray-100 animate-pulse" />
              <div className="h-20 rounded-xl border border-gray-100 bg-gray-100 animate-pulse" />
            </>
          ) : (
            <>
              <StatCard
                icon={storyy}
                label="Stories"
                value={counts.stories === 0 ? "0/0" : String(counts.stories)}
                onView={() => navigate(`/schooldashboard/students/${id}/stories-report?category=stories`)}
              />
              <StatCard
                icon={langg}
                label="Languages"
                value={counts.languages === 0 ? "0/0" : String(counts.languages)}
                onView={() => navigate(`/schooldashboard/students/${id}/languages-report?category=languages`)}
              />
              {/* <StatCard
                icon={Teacers}
                label="Literacy"
                value="0/0"
                onView={() => navigate(`/schooldashboard/students/${id}/literacy-report?category=literacy`)}
              /> */}
            </>
          )}
        </div>
      </div>

      {/* Content table — pass loading so it shows skeleton rows */}
      <ContentTable data={tableData} loading={loading} />

      {/* Optional: error text under table */}
      {errorMsg && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}
    </div>
  );
};

export default StudentView;
