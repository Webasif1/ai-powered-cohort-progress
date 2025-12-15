const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"],
    datasets: [
      {
        data: [12, 18, 14, 20, 16, 22, 15, 18, 2, 22, 15, 18],

        borderColor: "rgba(255,255,255,0.45)",
        borderWidth: 2,
        tension: 0.35,
        fill: false,

        pointRadius: 0,          // hidden by default
        pointHoverRadius: 5,     // show on hover
        pointBackgroundColor: "#fff",
        pointBorderWidth: 0,
      },
    ],
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: { display: false },

      tooltip: {
        enabled: true,
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        padding: 10,
        cornerRadius: 10,
        displayColors: false,

        callbacks: {
          title: (items) => `Time: ${items[0].label}`,
          label: (item) => `Wind: ${item.formattedValue} km/h`,
        },
      },
    },

    scales: {
      x: {
        ticks: { display: false },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: { display: false },
        grid: { display: false },
        border: { display: false },
      },
    },
  },
});
