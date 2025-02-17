// src/components/Charts/DonutChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";

const DonutChart = () => {
  // Chart data
  const data = {
    labels: ["Direct", "Referral", "Social"],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
        hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      },
    ],
  };

  // Chart options
  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        bodyColor: "#858796",
        borderColor: "#dddfeb",
        borderWidth: 1,
        padding: {
          x: 15,
          y: 15,
        },
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false,
      },
    },
    cutout: "80%", // Equivalent to cutoutPercentage: 80 in Chart.js v2
  };

  return (
    <div className="chart-pie pt-4">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;