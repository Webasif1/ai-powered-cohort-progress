const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["00", "02", "04", "06", "8", "10", "12", "14", "16","18", "20","22"],
    datasets: [
      {
        data: [12, 18, 14, 20, 16, 22, 15, 18, 2 ,22, 15, 18],

        borderColor: "rgba(255,255,255,0.45)", // light white line
        borderWidth: 2,
        tension: 0.35,
        fill: false,

        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },

    scales: {
      x: {
        ticks: { display: false },
        grid: { display: false }, // ❌ no vertical lines
        border: { display: false },
      },
      y: {
        ticks: { display: false },
        grid: { display: false }, // ❌ no horizontal lines
        border: { display: false },
      },
    },
  },
});



