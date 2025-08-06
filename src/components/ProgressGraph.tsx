// 1️⃣ Install Chart.js + React wrapper:
// npm install chart.js react-chartjs-2

// -------------------------------
// src/components/ProgressGraph.tsx
// -------------------------------
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dummy data: hours per day
const sampleData = [0, 24, 48, 96, 120, 72, 144];
const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const data = {
  labels,
  datasets: [
    {
      label: "Hours",
      data: sampleData,
      borderColor: "#9FC43E",
      backgroundColor: "rgba(159,196,62,0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 0,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        stepSize: 24,
        callback: (value: number) => `${value}H`,
      },
      grid: {
        color: "#E5F4E3",
      },
    },
    x: {
      grid: { display: false },
    },
  },
  plugins: {
    legend: { display: false },
  },
};

const periods = [
  "Last 1 week",
  "Last 2 weeks",
  "Last 1 month",
  "Last 2 months",
  "Last 6 months",
  "Last 1 year",
];

const ProgressGraph: React.FC = () => {
  const [period, setPeriod] = React.useState(periods[0]);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">Child’s Activity</h2>

        {/* period selector */}
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
        >
          {periods.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressGraph;
