import React from "react";
import { useParams } from "react-router-dom";
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
import storyy from "@/assets/storyy.png";
import musicc from "@/assets/musicc.png";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

/* ---------- dummy data ---------- */
const modeData = {
  labels: ["Self Read", "Audio"],
  datasets: [
    {
      data: [45, 35], // %
      backgroundColor: ["#B5E9F8", "#9FC43E"],
      hoverBackgroundColor: ["#A4E1F3", "#86B83A"],
      borderWidth: 0,
    },
  ],
};

const quizData = {
  labels: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5", "Quiz 6"],
  datasets: [
    {
      label: "Score %",
      data: [70, 75, 72, 80, 68, 77],
      backgroundColor: "#CDE6F6",
      borderRadius: 4,
    },
  ],
};

const interestLabels = [
  "African Heroes",
  "Bedtime Stories",
  "Career Chronicles",
  "Climate Change",
  "Confidence & Self-Esteem",
  "Endangered African Animals",
  "EYFS Early Readers Series",
  "Fairy Tales & Folk Tales",
  "Holidays & Celebrations",
  "Life & Growing Up",
];
const interestValues = [25, 23, 20, 20, 15, 13, 10, 5, 5, 5];
const interestData = {
  labels: interestLabels,
  datasets: [
    {
      data: interestValues,
      backgroundColor: "#9FC43E",
      borderRadius: 4,
      barThickness: 16,
    },
  ],
};

const selectStyle =
  "border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none";

/* ---------- page ---------- */
const StudentStoriesReport: React.FC = () => {
  const { id, type } = useParams(); // could be used to fetch real data

  return (
    <div className="space-y-8 pb-8 px-4 min-h-screen">
      {/* breadcrumb */}
      <nav className="text-sm text-gray-600">
        <span className="cursor-pointer hover:underline">Student</span> &gt;{" "}
        <span className="cursor-pointer hover:underline">View</span> &gt;{" "}
        <span className="font-medium text-gray-900">{type}</span>
      </nav>

      {/* title */}
      <h1 className="text-xl font-semibold relative -top-4 text-gray-900">{type}</h1>

      {/* charts row */}
      <div className="grid gap-6 lg:grid-cols-2 relative -top-6">
        {/* Mode of Consumption */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col gap-8">
          {/* header */}
          <div className="flex justify-between items-center">
            <h2 className="font-inter font-semibold text-[20px] leading-[24.48px] text-gray-900">Mode of Consumption</h2>
            <select
              defaultValue="Last 1 week"
              className="border border-gray-300 rounded-lg px-4 py-1.5 text-sm focus:outline-none"
            >
              {[
                "Last 1 week",
                "Last 2 weeks",
                "Last 1 month",
                "Last 2 months",
                "Last 6 months",
                "Last 1 year",
              ].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* chart + legend */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12">
            {/* doughnut */}
            <div className="w-40 h-40 sm:w-[199.238px] sm:h-[199.238px]">
              <Doughnut data={modeData} options={{ cutout: "50%", plugins: { legend: { display: false } } }} />
            </div>

            {/* legend wrapper */}
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-14">
              {/* Self Read */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-[28px] border border-[#B5E9F8] flex items-center justify-center">
                  <img
                    src={storyy}
                    alt=""
                    className="w-full h-full"
                    style={{ opacity: 1, transform: 'rotate(0deg)' }}
                  />
                </div>
                <span className="font-normal text-[14px] leading-[145%] text-gray-600">Self Read</span>
                <span className="font-inter font-semibold text-[24px] leading-[120%] tracking-[-0.02em] text-[#1F2937]">45%</span>
              </div>

              {/* Audio */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-[28px] border border-[#B5E9F8] flex items-center justify-center">
                  <img
                    src={musicc}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <span className="font-normal text-[14px] leading-[145%] text-gray-600">Audio</span>
                <span className="text-2xl font-bold text-[#1F2937]">35%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz bar chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="font-inter font-semibold text-[20px] leading-[24.48px] text-gray-900 mb-7">
            Stories Quiz Report
          </h2>
          <Bar
            data={quizData}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  suggestedMax: 90,
                  ticks: {
                    stepSize: 30, // Set step size to 30
                  },
                  grid: { color: "#A8C5DA", lineWidth: 0.14, borderDash: [8, 4] }, // Widely spaced and very thin lines
                },
                x: { grid: { display: false } },
              },
              barThickness: 24, // Adjusted bar thickness
            }}
          />
        </div>
      </div>

      {/* Interest horizontal bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-medium text-gray-800">
            Top Stories Interest
          </h2>
          <select className={selectStyle}>
            <option>Last 7 days</option>
            <option>Last 14 days</option>
            <option>Last 30 days</option>
          </select>
        </div>

        <Bar
          data={interestData}
          options={{
            indexAxis: "y",
            plugins: { legend: { display: false } },
            scales: {
              x: {
                beginAtZero: true,
                grid: { color: "#EEF2F6" },
              },
              y: {
                grid: { display: false },
                ticks: { autoSkip: false },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default StudentStoriesReport;
