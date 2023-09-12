import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = (data: number[]) => ({
  datasets: [
    {
      data: data ?? [42, 76, 38],
      backgroundColor: [
        "rgba(43, 180, 87, 1)",
        "rgba(133, 48, 193, 1)",
        "rgba(251, 199, 13, 1)",
      ],

      borderWidth: 1,
    },
  ],
});

function KundaChart({ data }: { data: number[] }) {
  return <Doughnut data={options(data)} />;
}

export default KundaChart;
