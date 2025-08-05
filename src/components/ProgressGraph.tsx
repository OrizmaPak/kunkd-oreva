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

const ProgressGraph: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-medium text-gray-800">Child’s Activity</h2>
      <label className="inline-flex items-center text-sm text-gray-600">
        <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600" />
        <span className="ml-2">Last 1 week</span>
      </label>
    </div>
    <Line data={data} options={options} />
  </div>
);

export default ProgressGraph;

