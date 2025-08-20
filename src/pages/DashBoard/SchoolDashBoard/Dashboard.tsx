import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FiCalendar, FiMoreHorizontal } from "react-icons/fi";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { IoLibraryOutline } from "react-icons/io5";

/* ---------- mock data (replace with API later) ---------- */
const classPerformance = [
  { name: "Class A", Stories: 650, Literacy: 380, Languages: 300, Quiz: 720 },
  { name: "Class B", Stories: 760, Literacy: 420, Languages: 330, Quiz: 760 },
  { name: "Class C", Stories: 760, Literacy: 410, Languages: 310, Quiz: 760 },
  { name: "Class D", Stories: 760, Literacy: 450, Languages: 350, Quiz: 780 },
  { name: "Class E", Stories: 820, Literacy: 470, Languages: 360, Quiz: 900 },
  { name: "Class F", Stories: 760, Literacy: 400, Languages: 300, Quiz: 940 },
];

const pieData = [
  { name: "Stories", value: 121799 },
  { name: "Audiobook", value: 66734 },
  { name: "Literacy Content", value: 21567 },
  { name: "Languages", value: 11387 },
  { name: "Quiz", value: 7806 },
];

const COLORS = ["#5B8DEF", "#A3DAFF", "#B7E0FF", "#8BC1F7", "#CFE8FF"];

const requests = Array.from({ length: 10 }, () => ({
  name: "Jaydon Korsgaard",
}));

/* ---------- small helpers ---------- */
const StatCard = ({ icon, label, value }) => (
  <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="absolute -top-3 -right-3 rounded-full bg-sky-50 p-3 text-sky-600 shadow">
      {icon}
    </div>
    <p className="text-slate-500">{label}</p>
    <p className="mt-1 text-2xl font-semibold text-slate-800">{value}</p>
  </div>
);

const LegendDot = ({ color }) => (
  <span
    className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
    style={{ backgroundColor: color }}
  />
);

const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-[11px] font-semibold text-slate-700">
      {initials}
    </div>
  );
};

/* ---------- main component ---------- */
export default function Dashboard() {
  return (
    <div className="mx-auto w-[clamp(320px,100%,1200px)] p-4 md:p-6">
      {/* top: welcome + date */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr,260px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">
            Welcome David
          </h1>
          <p className="mt-1 text-slate-500">
            It’s a sunny day today, let’s give our students the best{" "}
            <span className="align-middle">😊</span>
          </p>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-slate-100 p-2 text-slate-700">
              <FiCalendar />
            </div>
            <div>
              <p className="text-xs text-slate-500">Today’s Date</p>
              <p className="text-sm font-semibold text-slate-800">
                1st July, 2023
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* stats + request log */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr,310px]">
        {/* left column */}
        <div className="space-y-5">
          {/* stat cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              icon={<IoLibraryOutline className="text-xl" />}
              label="Classes"
              value="0/3"
            />
            <StatCard
              icon={<FaChalkboardTeacher className="text-xl" />}
              label="Teachers"
              value="0/5"
            />
            <StatCard
              icon={<FaUserGraduate className="text-xl" />}
              label="Students"
              value="0/5"
            />
          </div>

          {/* Class Performance */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800">
                Class Performance
              </h2>

              {/* fake filters to match figma look */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="rounded-md border border-slate-200 px-2 py-1">
                  1 Jan 2023 – 20 Aug 2023
                </span>
                <span className="rounded-md border border-slate-200 px-2 py-1">
                  Grade Level
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classPerformance} barGap={6} barSize={18}>
                  <CartesianGrid stroke="#EEF2F7" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.03)" }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #E5E7EB",
                    }}
                  />
                  <Bar dataKey="Stories" fill="#5B8DEF" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Literacy" fill="#A3DAFF" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Languages" fill="#8BC1F7" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Quiz" fill="#CFE8FF" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Consumed Content + Devices + Pie */}
          <div className="grid grid-cols-1 gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr,1fr]">
            {/* left: numbers and devices */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-500">Top Consumed Content</p>
                <div className="mt-1 flex items-baseline gap-3">
                  <p className="text-3xl font-semibold text-slate-900">
                    123,456
                  </p>
                  <span className="text-xs text-slate-500">views</span>
                </div>

                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
                  ▲ 3.4% <span className="text-slate-500">( +20,904 )</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-xs font-medium text-slate-500">
                  Devices Used
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
                    <span className="text-slate-600">Web</span>
                    <span className="text-slate-400">(+20,904)</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
                    <span className="text-slate-600">Mobile</span>
                    <span className="text-slate-400">(+20,904)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* right: donut + legend */}
            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr,1fr]">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={1}
                      dataKey="value"
                      nameKey="name"
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <ul className="space-y-2">
                {pieData.map((item, i) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center">
                      <LegendDot color={COLORS[i % COLORS.length]} />
                      <span className="text-slate-600">{item.name}</span>
                    </div>
                    <span className="tabular-nums text-slate-500">
                      {item.value.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* right column: Request Log */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Request Log</h3>
            <button className="text-xs font-medium text-sky-600 hover:underline">
              See all
            </button>
          </div>

          <ul className="space-y-3">
            {requests.map((r, idx) => (
              <li
                key={`${r.name}-${idx}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={r.name} />
                  <div className="text-sm">
                    <p className="font-medium text-slate-800">{r.name}</p>
                    <p className="text-xs text-slate-500">2m ago</p>
                  </div>
                </div>
                <button className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100">
                  <FiMoreHorizontal />
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
