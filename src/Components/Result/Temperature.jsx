import React from "react";
import { Line } from "react-chartjs-2";

function Temperature({ hourlyTemps }) {
  const data = {
    labels: ["1h", "2h", "3h", "4h", "5h", "6h"],
    datasets: [
      {
        label: "Temperature",
        data: hourlyTemps,
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="temperature-graph">
      <Line data={data} options={options} />
    </div>
  );
}

export default Temperature;
