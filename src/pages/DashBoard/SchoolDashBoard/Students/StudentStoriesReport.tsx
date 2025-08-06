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
  const { id } = useParams(); // could be used to fetch real data

  return (
    <div className="space-y-8 pb-8 px-4 min-h-screen">
      {/* breadcrumb */}
      <nav className="text-sm text-gray-600">
        <span className="cursor-pointer hover:underline">Student</span> &gt;{" "}
        <span className="cursor-pointer hover:underline">View</span> &gt;{" "}
        <span className="font-medium text-gray-900">Stories Report</span>
      </nav>

      {/* title */}
      <h1 className="text-xl font-semibold relative -top-4 text-gray-900">Stories Report</h1>

      {/* charts row */}
      <div className="grid md:grid-cols-2 gap-6 relative -top-6">
        {/* Mode of consumption */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-medium text-gray-800">
              Mode of Consumption
            </h2>
            <select className={selectStyle}>
              <option>Last 1 week</option>
              <option>Last 2 weeks</option>
              <option>Last 1 month</option>
              <option>Last 2 months</option>
              <option>Last 6 months</option>
              <option>Last 1 year</option>
            </select>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="w-40 h-40">
              <Doughnut data={modeData} options={{ cutout: "70%" }} />
            </div>
            {/* legend */}
            <div className="flex gap-10 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#B5E9F8]" />
                Self Read 45%
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#9FC43E]" />
                Audio 35%
              </div>
            </div>
          </div>
        </div>

        {/* Quiz bar chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-base font-medium text-gray-800 mb-6">
            Stories Quiz Report
          </h2>
          <Bar
            data={quizData}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  suggestedMax: 100,
                  grid: { color: "#EEF2F6" },
                },
                x: { grid: { display: false } },
              },
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
