// -------------------------------
// src/pages/StudentView.tsx
// -------------------------------
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressGraph from "@/components/ProgressGraph";
import StatCard from "@/components/StatCard";
import ContentTable, { ContentItem } from "@/components/ContentTable";
import child from "@/assets/child.png";
import storyy from "@/assets/storyy.png";
import langg from "@/assets/langg.png";
import Teacers from "@/assets/Teachers.png";
import { GetSchoolStudentStat } from "@/api/api";

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

const minutesToHMM = (mins?: number) => {
  const m = Math.max(0, Number(mins || 0));
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${h}:${mm < 10 ? `0${mm}` : mm}`;
};

const StudentView: React.FC<{ crumb?: boolean }> = ({ crumb = true }) => {
  const { id } = useParams<{ id: string }>();
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
      } catch (e) {
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
  }, [id, start, end]);

  /** ===== Header values ===== */
  const student = {
    name: stats?.name || "—",
    email: stats?.parent_email || "—",
    avatarUrl: stats?.avatar || "",
    class: stats?.class || "—",
    timeHMM: minutesToHMM(stats?.total_time_spent),
  };

  const teacher = {
    name: stats?.teacher_name || "—",
    email: stats?.teacher_email || "—",
    avatarUrl: stats?.teacher_picture || "",
  };

  const counts = stats?.content_progress_log || {
    stories: 0,
    languages: 0,
    audio_books: 0,
    quiz: 0,
  };

  /** ===== Graph data from learning_hours (convert minutes → hours) ===== */
  const graphLabels = React.useMemo(() => {
    const lh = stats?.learning_hours || {};
    const dates = Object.keys(lh).sort(); // YYYY-MM-DD asc
    return dates.map((d) =>
      new Date(d).toLocaleDateString(undefined, { weekday: "long" })
    );
  }, [stats]);

  const graphValues = React.useMemo(() => {
    const lh = stats?.learning_hours || {};
    const dates = Object.keys(lh).sort();
    return dates.map((d) => Math.round((lh[d] || 0) / 60)); // hours
  }, [stats]);

  /** ===== Map API rows -> ContentItem (NO dummies) ===== */
  const toContent = React.useCallback(
    (rows: TRow[], status: "Ongoing" | "Completed"): ContentItem[] =>
      (rows || []).map((r) => ({
        id: r.id,
        title: r.name,
        category: r.category,
        readType: "Self Read",     // backend doesn't provide; neutral default
        dateAssigned: "—",         // not in payload
        dateStarted: "—",          // not in payload
        status,
        thumb: r.thumbnail || "",
      })),
    []
  );

  const tableData = React.useMemo<ContentItem[]>(
    () => [
      ...toContent(stats?.ongoing_contents || [], "Ongoing"),
      ...toContent(stats?.recently_completed_content || [], "Completed"),
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

      {/* Info cards (UI unchanged) */}
      <div className="grid gap-6 md:grid-cols-2 relative -top-4">
        <div className="bg-white border border-gray-200 rounded-3xl px-6 lg:px-8 py-8 lg:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center space-x-4">
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
          </div>
          <div className="border-t lg:border-l lg:border-t-0 pt-4 lg:pt-0 lg:pl-6">
            <p className="text-sm text-gray-500">Class</p>
            <p className="text-lg font-semibold text-gray-800">{student.class}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl px-6 lg:px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-sm text-gray-500">Time spent</p>
            <p className="text-2xl font-bold text-gray-900">
              {student.timeHMM} <span className="text-gray-500 text-sm font-medium">Minutes</span>
            </p>
          </div>
          <div className="border-t lg:border-l lg:border-t-0 pt-4 lg:pt-0 lg:pl-6 flex flex-col">
            <p className="text-sm text-gray-500 relative top-1">Teacher</p>
            <p className="text-ms font-semibold text-gray-800">{teacher.name}</p>
            <p className="text-sm text-gray-500 relative -top-1">{teacher.email}</p>
          </div>
        </div>
      </div>

      {/* Progress report (graph fed with API values; UI unchanged) */}
      <h2 className="text-xl font-semibold text-gray-900 mt-10">Progress report</h2>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressGraph labels={graphLabels} values={graphValues} />
        </div>
        <div className="flex flex-col gap-4 w-full lg:max-w-xs mx-auto">
          {/* If 0 → show 0/0. Literacy is always 0/0 per instruction */}
          <StatCard
            icon={storyy}
            label="Stories"
            value={counts.stories === 0 ? "0/0" : String(counts.stories)}
            onView={() => navigate(`/schooldashboard/students/${id}/stories-report`)}
          />
          <StatCard
            icon={langg}
            label="Languages"
            value={counts.languages === 0 ? "0/0" : String(counts.languages)}
            onView={() => navigate(`/schooldashboard/students/${id}/languages-report`)}
          />
          <StatCard
            icon={Teacers}
            label="Literacy"
            value="0/0"
            onView={() => navigate(`/schooldashboard/students/${id}/literacy-report`)}
          />
        </div>
      </div>

      {/* Content table — now fed with ONLY API data */}
      <ContentTable data={tableData} />
    </div>
  );
};

export default StudentView;
