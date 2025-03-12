import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

// Register necessary Chart.js elements so the Doughnut chart works properly
Chart.register(ArcElement, Tooltip, Legend);

/**
 * DonutChart Component
 *
 * This component renders a doughnut chart using react-chartjs-2.
 * It expects a `chartData` object that contains the data and labels for the chart.
 *
 * @param {object} props - Component props.
 * @param {object} props.chartData - An object containing the chart data and configuration.
 * @returns {JSX.Element} The rendered doughnut chart.
 */
const DonutChart = ({ chartData }) => {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: "rgb(255,255,255)", // White tooltip background
        bodyColor: "#858796",                  // Text color for tooltip body
        borderColor: "#dddfeb",                // Tooltip border color
        borderWidth: 1,                        // Tooltip border width
        padding: { x: 15, y: 15 },             // Padding inside the tooltip
        displayColors: false,                  // Disable display of color boxes in tooltip
        caretPadding: 10,                      // Space between tooltip and the chart
      },
      legend: { display: true },
    },
    cutout: "80%", // Determines the size of the inner cutout (donut hole)
  };

  // Render the Doughnut chart with the provided data and options
  return (
    <div className="chart-pie pt-4">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

// PropTypes definition to ensure the component receives the correct props
DonutChart.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default DonutChart;