import DateRadio from "@/pages/DashBoard/SchoolDashBoard/Main/Dwmy";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Learning Hours",
    },
  },
};

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const data = {
  labels,
  datasets: [
    {
      label: "Hours",
      data: [6, 6, 3, 6, 4, 7, 9],
      backgroundColor: "rgba(133, 48, 193, 1)",
    },
    // {
    //   label: "Dataset 2",
    //   data: [2, 3, 5, 6, 7, 8, 9],
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    // },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}

const LearningHour = () => {
  return (
    <div className="bg-white rounded-3xl py-2 px-4 mt-4">
      <div className="flex justify-between">
        <h1 className="text-[20px] font-bold">Learning Hours</h1>
      </div>
      <BarChart />
    </div>
  );
};

export default LearningHour;
