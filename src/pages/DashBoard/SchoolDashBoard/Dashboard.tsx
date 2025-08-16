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
import { FiCalendar, FiMoreHorizontal, FiMoreVertical } from "react-icons/fi";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import {
    IoLibraryOutline,
    IoBookOutline,
    IoHeadsetOutline,
    IoDocumentTextOutline,
    IoLanguageOutline,
    IoClipboardOutline,
} from "react-icons/io5";
import EmptyClassPerformance from "@/components/EmptyStates/EmptyClassPerformance";
import EmptyTopConsumed from "@/components/EmptyStates/EmptyTopConsumed";

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
        <div className="absolute top-2 right-1 rounded-full p-3 text-sky-600 ">
            {icon}
        </div>
        <p className="text-slate-500" style={{ fontFamily: 'Inter', fontWeight: 400, fontStyle: 'Regular', fontSize: '14px', lineHeight: '145%', letterSpacing: '0%' }}>{label}</p>
        <p className="mt-1 text-[24px] font-[Inter] font-[600] text-gray-900" style={{ fontStyle: 'Semi Bold', lineHeight: '145%', letterSpacing: '0%' }}>{value}</p>
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
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-slate-200 text-[11px] font-semibold text-slate-700" style={{ transform: 'rotate(0deg)', opacity: 1, borderWidth: '1.5px' }}>
            {initials}
        </div>
    );
};

/* ---------- main component ---------- */
export default function Dashboard() {
    const [hasClassData, setHasClassData] = React.useState(false);
    const [hasStudentData, setHasStudentData] = React.useState(false);

    // (Temporary) dev switches you can delete later:
    // setHasClassData(false);   // show Class Performance empty state
    // setHasStudentData(false); // show Top Consumed empty state

    return (
        <div className="mx-auto w-[clamp(320px,100%,1200px)] p-4 md:p-6">
            {/* top: welcome + date */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr,310px]">
                <div className="rounded-2xl p-5 ">
                    <h1 className="font-[Inter] font-semibold text-[24px] leading-[120%] tracking-[-0.02em] text-slate-900">
                        Welcome David
                    </h1>
                    <p className="mt-1 text-slate-500" style={{ fontFamily: 'Inter', fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '145%', letterSpacing: '0%' }}>
                        It’s a sunny day today, let’s give our students the best{" "}
                        <span className="align-middle">😊</span>
                    </p>
                </div>

                <div className="flex items-center justify-start h-[80%] top-5 relative rounded-2xl border border-slate-200 bg-white px-10 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-slate-100 p-2 text-slate-700">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="40" rx="20" fill="#F0F2F5" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6666 10.8333C17.1269 10.8333 17.5 11.2064 17.5 11.6667V12.5H22.5V11.6667C22.5 11.2064 22.8731 10.8333 23.3333 10.8333C23.7935 10.8333 24.1666 11.2064 24.1666 11.6667V12.5H25C26.8409 12.5 28.3333 13.9924 28.3333 15.8333V25C28.3333 26.841 26.8409 28.3333 25 28.3333H15C13.159 28.3333 11.6666 26.841 11.6666 25V15.8333C11.6666 13.9924 13.159 12.5 15 12.5H15.8333V11.6667C15.8333 11.2064 16.2064 10.8333 16.6666 10.8333ZM22.5 14.1667C22.5 14.6269 22.8731 15 23.3333 15C23.7935 15 24.1666 14.6269 24.1666 14.1667H25C25.9204 14.1667 26.6666 14.9129 26.6666 15.8333V16.25H13.3333V15.8333C13.3333 14.9129 14.0795 14.1667 15 14.1667H15.8333C15.8333 14.6269 16.2064 15 16.6666 15C17.1269 15 17.5 14.6269 17.5 14.1667H22.5ZM26.6666 17.9167H13.3333V25C13.3333 25.9205 14.0795 26.6667 15 26.6667H25C25.9204 26.6667 26.6666 25.9205 26.6666 25V17.9167Z" fill="#344054" />
                            </svg>

                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Today’s Date</p>
                            <p className="font-[Inter] font-semibold text-[16px] leading-[145%] text-slate-800">
                                {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
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
                            icon={<svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="1" width="49" height="49" rx="24.5" fill="#ECF2FB" />
                                <rect x="0.5" y="1" width="49" height="49" rx="24.5" stroke="#A9C2EE" />
                                <path d="M14.0545 14.2734C13.0541 14.2734 12.2449 15.0664 12.2449 16.0458V34.9543C12.2449 35.9336 13.0541 36.7266 14.0545 36.7266H36.9659C37.9663 36.7266 38.7755 35.9336 38.7755 34.9543V16.0458C38.7755 15.0664 37.9663 14.2734 36.9659 14.2734H14.0545ZM14.657 16.6362H36.3634V34.3638H33.35V33.183H27.9223V34.3638H14.657V16.6362ZM25.5102 21.3638C25.0304 21.3638 24.5703 21.5506 24.231 21.8831C23.8918 22.2156 23.7012 22.6665 23.7012 23.1367C23.7012 23.6069 23.8918 24.0578 24.231 24.3903C24.5703 24.7228 25.0304 24.9096 25.5102 24.9096C25.99 24.9096 26.4501 24.7228 26.7894 24.3903C27.1287 24.0578 27.3193 23.6069 27.3193 23.1367C27.3193 22.6665 27.1287 22.2156 26.7894 21.8831C26.4501 21.5506 25.99 21.3638 25.5102 21.3638ZM20.6872 23.433C19.9377 23.433 19.3286 24.0288 19.3286 24.7612C19.3387 25.1073 19.486 25.4359 19.7394 25.6772C19.9928 25.9185 20.3322 26.0535 20.6855 26.0535C21.0388 26.0535 21.3782 25.9185 21.6316 25.6772C21.885 25.4359 22.0324 25.1073 22.0424 24.7612C22.0424 24.0278 21.4355 23.433 20.6872 23.433ZM30.3333 23.433C30.1519 23.4279 29.9714 23.4585 29.8024 23.523C29.6334 23.5875 29.4793 23.6846 29.3492 23.8085C29.2191 23.9324 29.1157 24.0805 29.0451 24.2443C28.9745 24.408 28.9382 24.584 28.9382 24.7617C28.9382 24.9395 28.9745 25.1154 29.0451 25.2791C29.1157 25.4429 29.2191 25.5911 29.3492 25.715C29.4793 25.8388 29.6334 25.9359 29.8024 26.0004C29.9714 26.0649 30.1519 26.0955 30.3333 26.0904C30.6861 26.0805 31.0212 25.9362 31.2672 25.6881C31.5133 25.44 31.6509 25.1077 31.6509 24.7617C31.6509 24.4157 31.5133 24.0834 31.2672 23.8353C31.0212 23.5872 30.6861 23.4429 30.3333 23.433ZM25.5102 26.0904C24.2069 26.0904 22.8428 26.5248 22.0303 27.1803C21.5956 27.0466 21.1428 26.9779 20.6872 26.9766C19.2346 26.9766 17.6704 27.7295 17.6704 28.6655V29.6362H33.35V28.6655C33.35 27.7295 31.7858 26.9766 30.3333 26.9766C29.88 26.9766 29.4157 27.0503 28.9901 27.1803C28.1776 26.5248 26.8135 26.0904 25.5102 26.0904Z" fill="#447ADC" />
                            </svg>
                            }
                            label="Classes"
                            value="0/3"
                        />
                        <StatCard
                            icon={<svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="1" width="49" height="49" rx="24.5" fill="#E3F2BD" />
                                <rect x="0.5" y="1" width="49" height="49" rx="24.5" stroke="#A5BF61" />
                                <path d="M24.2857 13.5H36.1577C37.0413 13.5 37.7571 14.2159 37.7571 15.0994V27.8681C37.7571 28.7535 37.0413 29.4694 36.1577 29.4694H26.4521M18.2555 20.0954C19.1301 20.0954 19.9689 19.7479 20.5873 19.1295C21.2057 18.5111 21.5532 17.6723 21.5532 16.7977C21.5532 15.9231 21.2057 15.0843 20.5873 14.4659C19.9689 13.8474 19.1301 13.5 18.2555 13.5C17.3809 13.5 16.5421 13.8474 15.9237 14.4659C15.3053 15.0843 14.9578 15.9231 14.9578 16.7977C14.9578 17.6723 15.3053 18.5111 15.9237 19.1295C16.5421 19.7479 17.3809 20.0954 18.2555 20.0954Z" stroke="#98B583" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M29.278 22.9701C29.278 21.902 28.4115 21.0354 27.3433 21.0354H18.2556C16.9323 21.0359 15.6633 21.5618 14.7275 22.4976C13.7917 23.4333 13.2658 24.7024 13.2653 26.0257V30.4546H15.4035L16.1175 37.99H20.3938L22.0365 24.9067H27.3433C28.4115 24.9067 29.278 24.0401 29.278 22.9701Z" stroke="#98B583" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            }
                            label="Teachers"
                            value="0/5"
                        />
                        <StatCard
                            icon={<svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="1" width="49" height="49" rx="24.5" fill="#F1EBD5" />
                                <rect x="0.5" y="1" width="49" height="49" rx="24.5" stroke="#ECCB54" />
                                <path d="M11.7772 17L19.7279 14.1667L27.6786 17L24.0646 19.125V21.25C24.0646 21.25 23.1004 20.5417 19.7279 20.5417C16.3554 20.5417 15.3912 21.25 15.3912 21.25V19.125L11.7772 17ZM11.7772 17V22.6667" stroke="#ECCB55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M24.0646 20.5417V21.8011C24.0646 24.2349 22.1232 26.2083 19.7279 26.2083C17.3326 26.2083 15.3912 24.2349 15.3912 21.8011V20.5417M30.3067 24.1258C30.3067 24.1258 31.0078 23.6258 33.4609 23.6258C35.9141 23.6258 36.6152 24.1244 36.6152 24.1244M30.3067 24.1258V22.6667L27.6786 21.25L33.4609 19.125L39.2432 21.25L36.6152 22.6667V24.1244M30.3067 24.1258V24.5338C30.3067 25.3537 30.639 26.1399 31.2305 26.7196C31.822 27.2993 32.6243 27.625 33.4609 27.625C34.2975 27.625 35.0998 27.2993 35.6913 26.7196C36.2828 26.1399 36.6152 25.3537 36.6152 24.5338V24.1244M31.2925 36.8333H36.6484C37.7658 36.8333 38.6534 36.3007 39.4514 35.5555C41.0849 34.0312 38.4033 32.8128 37.3813 32.2164C36.4724 31.6907 35.4631 31.3532 34.4159 31.2247C33.3686 31.0963 32.3056 31.1798 31.2925 31.4698M14.5021 31.0618C13.139 31.8084 9.56405 33.3313 11.7411 35.2367C12.805 36.1675 13.989 36.8333 15.4794 36.8333H23.9765C25.4654 36.8333 26.6508 36.1675 27.7147 35.2367C29.8918 33.3313 26.3169 31.8084 24.9537 31.0618C21.7561 29.3123 17.6998 29.3123 14.5021 31.0618Z" stroke="#ECCB55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            }
                            label="Students"
                            value="0/5"
                        />
                    </div>

                    {/* Class Performance */}
                    {hasClassData ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-sm font-semibold text-slate-800">Class Performance</h2>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span className="rounded-md border border-slate-200 px-2 py-1">
                                        1 Jan 2023 – 20 Aug 2023
                                    </span>
                                    <span className="rounded-md border border-slate-200 px-2 py-1">Grade Level</span>
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
                    ) : (
                        <EmptyClassPerformance onAddClass={() => console.log("Add class")} />
                    )}

                    {/* Top Consumed Content + Devices + Pie */}
                    {hasStudentData ? (
                        <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5 md:p-6 shadow-sm">
                            <div className="grid items-center gap-6 md:grid-cols-3">
                                {/* LEFT: Title, total views, growth pill, devices used */}
                                <div>
                                    <p className="text-[13px] leading-[145%] text-start text-[#667185]">Top Consumed Content</p>

                                    <div className="mt-1 flex items-baseline gap-2">
                                        <span className="font-bold text-[28px] leading-[33.6px] tracking-[-0.02em] text-center text-[#101928]">123,456</span>
                                        <span className="font-medium text-[16px] leading-[33.6px] tracking-[-0.02em] text-center text-[#667185]">views</span>
                                    </div>

                                    <div className="mt-0 inline-flex items-center gap-2 rounded-full bg-emerald-50 pr-2.5 py-0 text-[11px] font-medium text-emerald-700">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.29289 14.9597C4.90237 15.3502 4.90237 15.9833 5.29289 16.3739C5.68342 16.7644 6.31658 16.7644 6.70711 16.3739L10.0678 13.0132L11.3675 14.0746C11.7759 14.4081 12.3731 14.3673 12.7322 13.9812L16.0028 10.4652L17.2705 11.8174C17.6482 12.2203 18.281 12.2407 18.6839 11.863C19.0869 11.4852 19.1073 10.8524 18.7295 10.4495L16.7295 8.31615C16.54 8.11401 16.2751 7.99956 15.9981 8.00009C15.721 8.00063 15.4565 8.11611 15.2678 8.31899L11.9064 11.9325L10.6325 10.8922C10.2349 10.5675 9.65592 10.5966 9.29289 10.9597L5.29289 14.9597Z" fill="#0F973D" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 3C2.79086 3 1 4.79086 1 7V17C1 19.2091 2.79086 21 5 21H19C21.2091 21 23 19.2091 23 17V7C23 4.79086 21.2091 3 19 3H5ZM3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" fill="#0F973D" />
                                        </svg>

                                        <span className="font-semibold text-[13px] leading-[140%] tracking-[-0.02em] text-center">34%</span>
                                        <span className="font-medium text-[13px] leading-[140%] tracking-[-0.02em] text-center text-[#98A2B3]">( +20,904 )</span>
                                    </div>

                                    <div className="mt-6">
                                        <p className="text-[13px] leading-[145%] text-start text-[#667185]">Devices Used</p>
                                        <p className="text-sm -mt-1">
                                            <span className="font-medium text-[16px] leading-[33.6px] tracking-[-0.02em] text-center text-[#344054]">Web</span>
                                            <span className="text-[13px] leading-[33.6px] tracking-[-0.02em] text-center text-[#98A2B3]"> (+20,904)</span>
                                        </p>
                                        <p className="text-sm -mt-2">
                                            <span className="font-medium text-[16px] leading-[33.6px] tracking-[-0.02em] text-center text-[#344054]">Mobile</span>
                                            <span className="text-[13px] leading-[33.6px] tracking-[-0.02em] text-center text-[#98A2B3]"> (+20,904)</span>
                                        </p>
                                    </div>
                                </div>

                                {/* MIDDLE: Donut chart */}
                                <div className="mx-auto h-40 w-full md:h-48">
                                    <ResponsiveContainer width={256} height={257} className="relative -top-7 right-14">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                dataKey="value"
                                                nameKey="name"
                                                innerRadius={0} // Set innerRadius to 0 to make it filled
                                                outerRadius={116}
                                                startAngle={90}
                                                endAngle={450}
                                                paddingAngle={1.5}
                                                stroke="none"
                                                opacity={1}
                                            >
                                                {pieData.map((_, i) => (
                                                    <Cell
                                                        key={i}
                                                        fill={
                                                            ["#E9F6FF", "#D6EEFF", "#C3E7FF", "#AFDFFF", "#98D4FF"][i % 5]
                                                        }
                                                    />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* RIGHT: Legend list with blue circular icons + values */}
                                <ul className="space-y-4">
                                    {pieData.map((item) => (
                                        <li key={item.name} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-[#E6F3FF] to-[#CDE7FF] text-[#4B9CE2]">
                                                    {{
                                                        Stories: <><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="24" height="24" rx="12" fill="#E2F9FF" />
                                                            <path d="M11.9746 16.3026C11.8946 16.3026 11.8135 16.2924 11.7313 16.272C11.6491 16.2511 11.5751 16.2215 11.5093 16.1833C11.0195 15.8971 10.5095 15.6838 9.97931 15.5433C9.44909 15.4029 8.90042 15.3329 8.33331 15.3333C7.98665 15.3333 7.64576 15.3622 7.31065 15.42C6.97598 15.4786 6.6502 15.572 6.33331 15.7C6.09154 15.7964 5.86442 15.7695 5.65198 15.6193C5.43954 15.4691 5.33331 15.2618 5.33331 14.9973V8.57998C5.33331 8.41509 5.37887 8.26642 5.46998 8.13398C5.56109 8.00153 5.68042 7.90753 5.82798 7.85198C6.21954 7.67953 6.62687 7.54998 7.04998 7.46331C7.47309 7.37664 7.90087 7.33331 8.33331 7.33331C8.98665 7.33331 9.61931 7.43375 10.2313 7.63464C10.8433 7.83553 11.4329 8.10264 12 8.43598V15.682C12.5582 15.3264 13.1506 15.0684 13.7773 14.908C14.4035 14.7471 15.0333 14.6666 15.6666 14.6666C16.0324 14.6666 16.3642 14.6871 16.662 14.728C16.9598 14.7689 17.2775 14.8391 17.6153 14.9386C17.7095 14.964 17.7971 14.9662 17.878 14.9453C17.9593 14.9235 18 14.8529 18 14.7333V7.75931C18.064 7.77175 18.1253 7.78953 18.184 7.81264C18.2426 7.83575 18.2984 7.86575 18.3513 7.90264C18.4566 7.9582 18.5355 8.03731 18.588 8.13998C18.6404 8.24264 18.6666 8.35509 18.6666 8.47731V14.972C18.6666 15.236 18.554 15.4411 18.3286 15.5873C18.1038 15.7335 17.8575 15.7624 17.59 15.674C17.2811 15.5544 16.9658 15.4678 16.644 15.414C16.3222 15.3602 15.9964 15.3333 15.6666 15.3333C15.0906 15.3333 14.5291 15.4035 13.982 15.544C13.4353 15.684 12.9169 15.8971 12.4266 16.1833C12.3609 16.222 12.2889 16.2515 12.2106 16.272C12.1324 16.2924 12.0542 16.3026 11.9746 16.3026ZM13.8066 13.5766C13.7124 13.6598 13.61 13.6771 13.4993 13.6286C13.3886 13.5802 13.3333 13.4924 13.3333 13.3653V8.45398C13.3333 8.41798 13.3418 8.38064 13.3586 8.34198C13.3755 8.30331 13.3962 8.27131 13.4206 8.24598L16.19 5.47731C16.2838 5.38309 16.3866 5.36153 16.4986 5.41264C16.6106 5.46375 16.6666 5.55442 16.6666 5.68464V10.876C16.6666 10.9226 16.6578 10.9633 16.64 10.998C16.6222 11.0326 16.6006 11.0624 16.5753 11.0873L13.8066 13.5766ZM11.3333 15.3653V8.82931C10.864 8.57153 10.3786 8.36887 9.87731 8.22131C9.37687 8.07375 8.8622 7.99998 8.33331 7.99998C7.9222 7.99998 7.54131 8.03687 7.19065 8.11064C6.84042 8.18398 6.52487 8.27687 6.24398 8.38931C6.17509 8.41509 6.11731 8.45153 6.07065 8.49864C6.02398 8.54575 6.00042 8.60353 5.99998 8.67198V14.7626C5.99998 14.8826 6.04065 14.9533 6.12198 14.9746C6.20331 14.996 6.29087 14.9893 6.38465 14.9546C6.65398 14.8618 6.94598 14.7906 7.26065 14.7413C7.57531 14.692 7.93287 14.6671 8.33331 14.6666C8.92976 14.6666 9.4902 14.7364 10.0146 14.876C10.5391 15.0151 10.9786 15.1782 11.3333 15.3653Z" fill="#447ADC" />
                                                        </svg>
                                                        </>,
                                                        Audiobook: <><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="24" height="24" rx="12" fill="#D6F6FF" />
                                                            <path d="M16 12.3827C16 12.1813 16 12.0807 16.028 11.9907C16.108 11.73 16.3213 11.6287 16.534 11.5227C16.7733 11.4027 16.8933 11.3433 17.0113 11.3333C17.1459 11.3211 17.2808 11.3526 17.396 11.4233C17.5493 11.5167 17.6553 11.6953 17.764 11.84C18.2673 12.508 18.5187 12.842 18.6107 13.2107C18.685 13.5079 18.685 13.8188 18.6107 14.116C18.4767 14.6533 18.0527 15.1033 17.7387 15.5207C17.578 15.734 17.4973 15.8407 17.396 15.9027C17.2809 15.9736 17.146 16.0054 17.0113 15.9933C16.8933 15.9827 16.7733 15.9227 16.534 15.804C16.3207 15.6973 16.1087 15.5967 16.0273 15.3353C16 15.2453 16 15.1447 16 14.9433V12.3827ZM8 12.3833C8 12.1293 7.99334 11.9013 7.806 11.7227C7.73734 11.658 7.64667 11.6127 7.466 11.5227C7.226 11.4033 7.10667 11.344 6.988 11.3333C6.63267 11.302 6.44134 11.5673 6.236 11.84C5.73267 12.508 5.48134 12.842 5.38934 13.2107C5.31505 13.5079 5.31505 13.8188 5.38934 14.116C5.52267 14.6533 5.94734 15.1033 6.26134 15.5207C6.45934 15.7833 6.648 16.0233 6.988 15.9927C7.10667 15.9827 7.22667 15.9227 7.466 15.8033C7.64667 15.7133 7.73734 15.6687 7.806 15.6033C7.99334 15.4253 7.99934 15.1967 7.99934 14.9433L8 12.3833Z" stroke="#447ADC" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M17.3334 11.3306V10.58C17.3334 7.68265 14.9447 5.33331 12 5.33331C9.05535 5.33331 6.66669 7.68265 6.66669 10.58V11.33M11.9987 12.9733C11.168 12.5333 9.33202 11.786 8.48935 12.0133C8.32935 12.08 7.99869 12.31 7.99869 13.0793L8.06269 17.064C8.06669 17.3106 8.25735 17.5126 8.49869 17.5466C9.32069 17.6626 10.72 17.996 11.9987 18.6666M11.9987 12.9733V18.6666M11.9987 12.9733C12.8287 12.5333 14.6654 11.786 15.508 12.0133C15.668 12.08 15.9987 12.31 15.9987 13.0793L15.9354 17.064C15.9317 17.183 15.8858 17.2969 15.8059 17.3853C15.7261 17.4737 15.6174 17.5309 15.4994 17.5466C14.6774 17.6626 13.2774 17.996 11.9987 18.6666" stroke="#447ADC" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                        </>,
                                                        "Literacy Content": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="24" height="24" rx="12" fill="#C4F2FF" />
                                                            <path d="M13.2857 6.39288H8.1786C7.97021 6.39288 7.77036 6.47566 7.62301 6.62301C7.47566 6.77036 7.39288 6.97021 7.39288 7.1786V15.8215C7.39288 16.0298 7.47566 16.2297 7.62301 16.377C7.77036 16.5244 7.97021 16.6072 8.1786 16.6072H15.25C15.4584 16.6072 15.6583 16.5244 15.8056 16.377C15.953 16.2297 16.0357 16.0298 16.0357 15.8215V12.2857M7.39288 14.25H16.0357M9.75003 8.35717H11.3215M9.75003 10.3215H10.5357" stroke="#447ADC" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M14.0667 11.8976L11.7096 12.3219L12.1025 9.93334L15.426 6.62548C15.4991 6.55184 15.586 6.49338 15.6817 6.45349C15.7775 6.4136 15.8802 6.39307 15.9839 6.39307C16.0876 6.39307 16.1903 6.4136 16.286 6.45349C16.3818 6.49338 16.4687 6.55184 16.5417 6.62548L17.3746 7.45834C17.4482 7.53138 17.5067 7.61828 17.5466 7.71403C17.5865 7.80977 17.607 7.91247 17.607 8.01619C17.607 8.11992 17.5865 8.22261 17.5466 8.31836C17.5067 8.41411 17.4482 8.50101 17.3746 8.57405L14.0667 11.8976Z" stroke="#447ADC" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                        ,
                                                        Languages: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="24" height="24" rx="12" fill="#B0DAE6" />
                                                            <path d="M12 6C8.6862 6 6 8.6862 6 12C6 15.3138 8.6862 18 12 18C15.3138 18 18 15.3138 18 12C18 8.6862 15.3138 6 12 6ZM12 16.8L13.2 15.6L13.8 15V13.8H12.6V13.2L12 12.6H10.2V14.4L11.4 15.6V16.7586C9.036 16.4616 7.2 14.4432 7.2 12L7.8 12.6H9V11.4H10.2L12 9.6V8.4H10.8L10.2 7.8V7.5534C11.3539 7.08319 12.6461 7.08319 13.8 7.5534V8.4L13.2 9V10.2L13.8 10.8L15.678 8.922C16.1346 9.46875 16.4637 10.1103 16.6416 10.8H15.6L14.4 12V13.2L15 13.8H16.2L16.3716 13.9716C15.6174 15.6366 13.9434 16.8 12 16.8Z" fill="#447ADC" />
                                                        </svg>
                                                        ,
                                                        Quiz: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="24" height="24" rx="12" fill="#9DC2CC" />
                                                            <path d="M9.06251 6.89581C8.21968 6.92127 7.71755 7.01498 7.3698 7.36273C6.89368 7.8394 6.89368 8.60585 6.89368 10.1393V13.6634C6.89368 15.1974 6.89368 15.9639 7.3698 16.4405C7.84539 16.9166 8.61184 16.9166 10.1437 16.9166H12.852C14.3844 16.9166 15.1503 16.9166 15.6259 16.44C16.1026 15.9639 16.1026 15.1974 16.1026 13.6634V10.1393C16.1026 8.6064 16.1026 7.8394 15.6259 7.36273C15.2787 7.01498 14.776 6.92127 13.9332 6.89581" stroke="#447ADC" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M8.52081 10.4166H10.6875M12.3125 10.9583C12.3125 10.9583 12.5833 10.9583 12.8541 11.5C12.8541 11.5 13.7143 10.1458 14.4791 9.87498M8.52081 13.6666H10.6875M12.3125 14.2083C12.3125 14.2083 12.5833 14.2083 12.8541 14.75C12.8541 14.75 13.7143 13.3958 14.4791 13.125M9.06031 7.03123C9.06031 6.50798 9.48498 6.08331 10.0082 6.08331H12.9874C13.2388 6.08331 13.4799 6.18318 13.6577 6.36095C13.8354 6.53872 13.9353 6.77983 13.9353 7.03123C13.9353 7.28263 13.8354 7.52374 13.6577 7.70151C13.4799 7.87928 13.2388 7.97915 12.9874 7.97915H10.0082C9.75683 7.97915 9.51572 7.87928 9.33795 7.70151C9.16018 7.52374 9.06031 7.28263 9.06031 7.03123Z" stroke="#447ADC" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                        ,
                                                    }[item.name] || <IoBookOutline size={14} />}
                                                </span>
                                                <span className="text-[#344054]">{item.name}</span>
                                            </div>
                                            <span className="tabular-nums font-medium text-[#101928]">
                                                {item.value.toLocaleString()}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <EmptyTopConsumed onAddStudent={() => console.log("Add student")} />
                    )}
                </div>

                {/* right column: Request Log */}
                <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-[Inter] font-semibold text-slate-800 text-[18px] leading-[145%]">Request Log</h3>
                        <button className="text-xs font-medium text-sky-600 hover:underline flex gap-1">
                            <span className="font-inter font-semibold text-[#667185] text-[16px] leading-[145%] text-center align-middle">
                                See all
                            </span>
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.4027 11.6423C14.0067 11.0005 14.0067 9.99947 13.4027 9.35772L7.27354 2.84553C6.95811 2.51038 6.43072 2.4944 6.09557 2.80983C5.76043 3.12526 5.74445 3.65266 6.05988 3.9878L12.189 10.5L6.05988 17.0122C5.74445 17.3473 5.76043 17.8747 6.09557 18.1902C6.43072 18.5056 6.95811 18.4896 7.27354 18.1545L13.4027 11.6423Z" fill="#667185" />
                            </svg>

                        </button>

                    </div>

                    <ul className="space-y-3">
                        {requests.map((r, idx) => (
                            <li
                                key={`${r.name}-${idx}`}
                                className="flex items-center justify-between rounded-xl px-3 py-2"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar name={r.name} />
                                    <div className="text-sm ">
                                        <p className="text-slate-800 font-[Inter] font-medium text-[14px] leading-[145%]">{r.name}</p>
                                        <p className="text-xs text-slate-500 hidden">2m ago</p>
                                    </div>
                                </div>
                                <button className="relative left-4">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" />
                                        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="#E4E7EC" />
                                        <path d="M17 10.6667C17 11.2189 16.5523 11.6667 16 11.6667C15.4477 11.6667 15 11.2189 15 10.6667C15 10.1144 15.4477 9.66666 16 9.66666C16.5523 9.66666 17 10.1144 17 10.6667Z" fill="black" />
                                        <path d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z" fill="black" />
                                        <path d="M16 22.3333C16.5523 22.3333 17 21.8856 17 21.3333C17 20.781 16.5523 20.3333 16 20.3333C15.4477 20.3333 15 20.781 15 21.3333C15 21.8856 15.4477 22.3333 16 22.3333Z" fill="black" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    );
}
