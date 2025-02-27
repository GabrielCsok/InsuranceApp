import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ chartData }) => {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        bodyColor: "#858796",
        borderColor: "#dddfeb",
        borderWidth: 1,
        padding: { x: 15, y: 15 },
        displayColors: false,
        caretPadding: 10,
      },
      legend: { display: true },
    },
    cutout: "80%",
  };

  return (
    <div className="chart-pie pt-4">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;