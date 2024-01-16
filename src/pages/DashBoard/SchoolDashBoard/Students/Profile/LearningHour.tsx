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
import { Skeleton } from "@mantine/core";

import { TSchoolStudentStat } from ".";
// import { number } from "zod";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// eslint-disable-next-line
export const options = {
  scales: {
    y: {
      display: false, // Hide the vertical axis
    },
    x: {
      grid: {
        display: false, // Hide the grid lines
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      // text: "Learning Hours",
    },
  },
  barThickness: 10,
};

const labels = ["M", "T", "W", "T", "F", "S", "S"];
// eslint-disable-next-line
export const data = {
  labels,
  datasets: [
    {
      label: "Hours",
      data: [6, 6, 3, 6, 4, 7, 9],
      backgroundColor: "#e0b3ef", // Set the bar color as a gradient
      borderWidth: 0, // Remove the border
      barPercentage: 0.2, // Reduce the bar width (adjust as needed)
      borderRadius: 4, // Set the border radius (adjust as needed)
    },
    // {
    //   label: "Dataset 2",
    //   data: [2, 3, 5, 6, 7, 8, 9],
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    // },
  ],
};

export function BarChart({ meta }: { meta: number[] }) {
  console.log("Meta", data);
  data.datasets[0].data = meta;
  if (meta.length < 1) {
    return "loading ...";
  }

  return <Bar options={options} data={data} />;
}

const LearningHour = ({
  schoolStudentStat,
  isLoading,
}: {
  schoolStudentStat: TSchoolStudentStat;
  isLoading: boolean;
}) => {
  console.log("LEARNIG HOURS", schoolStudentStat?.learning_hours);

  const dataArray = Object.values(schoolStudentStat?.learning_hours ?? {}).map(
    (value) => value / 3600
  );
  console.log("dataArray", dataArray);
  return (
    <>
      {isLoading ? (
        <Skeleton
          height={300}
          width={350}
          radius={20}
          mb="xl"
          visible={isLoading}
        />
      ) : (
        <div className="bg-white rounded-3xl flex-grow py-2 px-4 mt-2">
          <div className="flex justify-between">
            <h1 className="text-[16px] font-Hanken font-semibold ">
              Learning Hours
            </h1>
          </div>
          <BarChart meta={dataArray} />
        </div>
      )}
    </>
  );
};

export default LearningHour;
