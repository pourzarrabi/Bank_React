"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.currentBalance);

  const data = {
    datasets: [
      {
        label: "موجودی",
        data: balances,
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: accountNames,
  };

  return (
    <div>
      <Doughnut
        data={data}
        options={{
          cutout: "60%",
          plugins: {
            tooltip: {
              displayColors: false,
              rtl: true,
              titleFont: {
                family: "var(--font-vazir)",
              },
              bodyFont: {
                family: "var(--font-vazir)",
              },
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart;
