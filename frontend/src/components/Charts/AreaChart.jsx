// src/components/Charts/AreaChart.jsx
import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

const AreaChart = () => {
  // Helper function for number formatting
  const numberFormat = (number, decimals, decPoint, thousandsSep) => {
    number = (number + "").replace(",", "").replace(" ", "");
    const n = !isFinite(+number) ? 0 : +number;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSep === "undefined" ? "," : thousandsSep;
    const dec = typeof decPoint === "undefined" ? "." : decPoint;
    let s = "";
    const toFixedFix = (n, prec) => {
      const k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  };

  // Chart data and options
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Earnings",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "date",
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          maxTicksLimit: 7,
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          callback: (value) => "$" + numberFormat(value),
        },
        grid: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2],
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        bodyColor: "#858796",
        titleMarginBottom: 10,
        titleColor: "#6e707e",
        titleFont: {
          size: 14,
        },
        borderColor: "#dddfeb",
        borderWidth: 1,
        padding: {
          x: 15,
          y: 15,
        },
        displayColors: false,
        intersect: false,
        mode: "index",
        caretPadding: 10,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            return `${label}: $${numberFormat(value)}`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-area">
      <Line data={data} options={options} />
    </div>
  );
};

export default AreaChart;