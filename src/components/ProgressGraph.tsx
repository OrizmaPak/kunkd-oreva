// 1️⃣ Ensure you have Chart.js + React wrapper installed:
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

type Props = {
  /** X-axis labels, e.g. ["Monday", ...] */
  labels?: string[];
  /** Y values in HOURS (we convert from minutes in StudentView) */
  values?: number[];
  /** Optional custom title (defaults to “Child’s Activity”) */
  title?: string;
};

const fallbackLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const fallbackValues = [0, 24, 48, 96, 120, 72, 144]; // hours example

const ProgressGraph: React.FC<Props> = ({
  labels: inLabels,
  values: inValues,
  title = "Child’s Activity",
}) => {
  const labels = (inLabels && inLabels.length ? inLabels : fallbackLabels);
  const values = (inValues && inValues.length ? inValues : fallbackValues);

  // Compute a “nice” step size for Y ticks
  const maxY = Math.max(1, ...values);
  const roughStep = Math.max(1, Math.ceil(maxY / 4));
  // Prefer steps of 24 when data spans large hour values, else use computed
  const tickStep = maxY >= 24 ? 24 : roughStep;

  const data = {
    labels,
    datasets: [
      {
        label: "Hours",
        data: values,
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
    maintainAspectRatio: false as const, // so it fits the container height
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxY === 0 ? 1 : undefined,
        ticks: {
          stepSize: tickStep,
          // In Chart.js v4 the callback receives a tick value (number|string)
          callback: (value: any) => `${value}H`,
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
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.parsed.y}h`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 min-h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">{title}</h2>

        {/* Period selector is kept from your snippet but is visual only (no data refetch here).
           If you later want it to drive the query window, lift this state to StudentView. */}
        <select
          defaultValue="Last 1 week"
          className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
        >
          <option>Last 1 week</option>
          <option>Last 2 weeks</option>
          <option>Last 1 month</option>
          <option>Last 2 months</option>
          <option>Last 6 months</option>
          <option>Last 1 year</option>
        </select>
      </div>

      {/* Fixed height so the chart renders nicely within your card */}
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ProgressGraph;
