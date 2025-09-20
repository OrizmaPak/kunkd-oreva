// -------------------------------
// src/pages/DashBoard/SchoolDashBoard/Students/StudentView.tsx
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
import { GetProgressReport } from "@/api/api";
import { getUserState } from "@/store/authStore";

/** ===== Types for the new single progress endpoint ===== */
type TProgressReport = {
  stories: { completed: number; total: number };
  languages: { completed: number; total: number };
  child_activities: { day: string; hours: number }[];
  contents: Array<{
    category: string;
    title: string;
    status: string; // "complete" | "completed" | "ongoing"
    media_type: string; // "Text" | "Video" | "Audio"
    media_file: string;
    date_started: string; // ISO
  }>;
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

const StudentView: React.FC<{ crumb?: boolean }> = ({ crumb = true }) => {
  const { id: paramId } = useParams<{ id: string }>();
  const id = paramId || (typeof window !== "undefined" ? sessionStorage.getItem("profileId") : null);
  const navigate = useNavigate();

  /** ===== Data state ===== */
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState<TProgressReport | null>(null);

  // last 7 days window (kept for fallback graph labels)
  const today = new Date();
  const end = today.toISOString().slice(0, 10);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 6);
  const start = startDate.toISOString().slice(0, 10);

  /** Auth/user role (for profile header fill-ins only) */
  const [user] = useStore(getUserState);
  const role = (user?.role || "").toLowerCase();

  /** Tolerant profiles grab (unchanged) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profiles = useStore((s: any) => s.profiles ?? s.profile?.profiles ?? s.children ?? []);

  /** Active profile (for header) */
  const activeProfile = React.useMemo(() => {
    if (!id) return undefined;
    const pid = String(id);
    return (profiles as Array<any>).find((p) => String(p?.id) === pid);
  }, [id, profiles]);

  /** Fetch only the unified progress endpoint */
  React.useEffect(() => {
    let ignore = false;
    const run = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setErrorMsg(null);

        const resPR = await GetProgressReport(String(id));
        if (ignore) return;
        const dataPR = (resPR as any)?.data?.data as TProgressReport | undefined;
        setProgress(dataPR || null);
      } catch {
        if (!ignore) {
          setProgress(null);
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

  /** ===== Header values (from profile + derived time) ===== */
  // Derive total minutes from child_activities hours
  const totalMinutes = React.useMemo(() => {
    const hours = (progress?.child_activities || []).reduce((sum, a) => sum + Number(a.hours || 0), 0);
    return Math.round(hours * 60);
  }, [progress]);

  let student = {
    name: "—",
    email: "—",
    avatarUrl: "",
    class: "—",
    timeHMM: minutesToHMM(totalMinutes),
  };

  let teacher = {
    name: "—",
    email: "—",
    avatarUrl: "",
  };

  // Use active profile to fill header (unchanged visuals)
  if (activeProfile) {
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
    };
    teacher = {
      ...teacher,
      name: s?.student?.assigned_teacher_name || teacher.name,
    };
  }

  /** ===== Cards: "completed/total" ===== */
  const storiesValue = progress?.stories
    ? `${progress.stories.completed}/${progress.stories.total}`
    : "0/0";

  const languagesValue = progress?.languages
    ? `${progress.languages.completed}/${progress.languages.total}`
    : "0/0";

  /** ===== Graph data from child_activities (fallback keeps layout) ===== */
  const graphLabels = React.useMemo(() => {
    if (progress?.child_activities?.length) {
      return progress.child_activities.map((a) => a.day);
    }
    // fallback to 7-day weekday names
    const dates = lastNDays(7);
    return dates.map((d) => new Date(d).toLocaleDateString(undefined, { weekday: "long" }));
  }, [progress]);

  const graphValues = React.useMemo(() => {
    if (progress?.child_activities?.length) {
      return progress.child_activities.map((a) => Number(a.hours || 0));
    }
    // fallback zeros to preserve graph height and spacing
    return Array(7).fill(0);
  }, [progress]);

  /** ===== Table: use contents[] ===== */
  const tableData: ContentItem[] = React.useMemo(() => {
    if (!progress?.contents?.length) return [];
    return progress.contents.map((c, idx) => {
      const s = String(c.status || "").toLowerCase();
      const status: "Ongoing" | "Completed" = s === "ongoing" ? "Ongoing" : "Completed";
      return {
        id: idx + 1, // payload has no explicit id
        title: c.title || "",
        category: c.category || "",
        readType: "Self Read",
        dateAssigned: "—",
        dateStarted: c.date_started ? new Date(c.date_started).toLocaleDateString() : "—",
        status,
        thumb: c.media_file || "",
      };
    });
  }, [progress]);

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
                  className="w-20 h-20 rounded-full object-cover"
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
                value={storiesValue}
                onView={() => navigate(`/schooldashboard/students/${id}/stories-report?category=stories`)}
              />
              <StatCard
                icon={langg}
                label="Languages"
                value={languagesValue}
                onView={() => navigate(`/schooldashboard/students/${id}/languages-report?category=languages`)}
              />
              {/* <StatCard
                icon={Teacers}
                label="Literacy"
                value="0/0"
                onView={() => navigate(`/schooldashboard/students/${id}/literacy-report?category=literacy`) }
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
