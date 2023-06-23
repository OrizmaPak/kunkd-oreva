import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  datasets: [
    {
      label: "# of Votes",
      data: [42, 76, 38],
      backgroundColor: [
        "rgba(43, 180, 87, 1)",
        "rgba(133, 48, 193, 1)",
        "rgba(251, 199, 13, 1)",
      ],

      borderWidth: 1,
    },
  ],
};

// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   // Adjust the size of the chart by modifying the following properties:
//   width: 800,
//   height: 800,
// };

function KundaChart() {
  return <Doughnut data={data} />;
}

export default KundaChart;
