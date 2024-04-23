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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        callback: function (value: unknown) {
          return value + " hr";
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Total average time spent per student",
    },
  },
};

const labels = ["Mon", "Tue", "Wed", "Thu", "Fi", "Sat", "Sun"];

export const data = {
  labels,
  datasets: [
    {
      label: "Current week",
      data: [1, 0.5, 2.4, 3.2, 1.4, 3, 2],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Prevoius week",
      data: [2, 1.1, 0.6, 2.5, 0.9, 2, 5],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function LineChart() {
  return <Line options={options} data={data} />;
}

export default LineChart;
