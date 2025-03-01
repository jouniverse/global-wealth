// Create mobile restriction overlay
function createMobileRestriction() {
  const mobileRestriction = document.createElement("div");
  mobileRestriction.classList.add("mobile-restriction");
  mobileRestriction.innerHTML = `
    <h1>Desktop Only</h1>
    <p>This application is optimized for desktop viewing only. Please access this site on a device with a screen width of at least 1050px for the best experience.</p>
  `;
  document.body.appendChild(mobileRestriction);

  // Check screen size on resize
  window.addEventListener("resize", checkScreenSize);

  // Initial check
  checkScreenSize();
}

// Check screen size function
function checkScreenSize() {
  const mobileRestriction = document.querySelector(".mobile-restriction");
  if (window.innerWidth < 1050) {
    mobileRestriction.style.display = "flex";
  } else {
    mobileRestriction.style.display = "none";
  }
}

// Initialize when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  createMobileRestriction();
});

// Create a variable to store the chart instance
let wealthChart = null;

// Function to check if Chart.js is loaded
function isChartJsLoaded() {
  return typeof Chart !== "undefined";
}

// Function to create the chart
function createChart(ctx, years, wealthData) {
  // Debug the data
  console.log("Years:", years);
  console.log("Wealth Data:", wealthData);

  // Check if we have valid data
  const hasValidData = wealthData.some(
    (value) => value !== null && value !== undefined
  );
  console.log("Has valid data:", hasValidData);

  // Destroy previous chart if it exists
  if (wealthChart) {
    wealthChart.destroy();
  }

  wealthChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "Total Wealth (Billion $)",
          data: wealthData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.1,
          pointRadius: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            color: "white",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        x: {
          ticks: {
            color: "white",
            maxRotation: 90,
            minRotation: 90,
            callback: function (value, index, values) {
              // Show only every 5 years
              const year = this.getLabelForValue(value);
              return year % 5 === 0 ? year : "";
            },
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "white",
            boxWidth: 10,
            boxHeight: 1,
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  });
}

window.onload = function () {
  console.log("SVG is interactive!");

  // Check if Chart.js is loaded
  if (!isChartJsLoaded()) {
    console.error("Chart.js is not loaded! Loading it dynamically...");

    // Dynamically load Chart.js if not already loaded
    const chartScript = document.createElement("script");
    chartScript.src =
      "https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js";
    document.head.appendChild(chartScript);

    // Wait for Chart.js to load
    chartScript.onload = initializeMap;
  } else {
    initializeMap();
  }
};

function initializeMap() {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  document.body.appendChild(tooltip);

  // Create years array from 2000 to 2022
  const years = Array.from({ length: 23 }, (_, i) => 2000 + i);

  // Debug wealthEstimatesByCountry
  console.log("wealthEstimatesByCountry exists:", !!wealthEstimatesByCountry);
  if (wealthEstimatesByCountry) {
    console.log(
      "wealthEstimatesByCountry length:",
      wealthEstimatesByCountry.length
    );
  }

  document.querySelectorAll(".world-map-svg path").forEach((path) => {
    path.addEventListener("mouseover", (event) => {
      const countryName = path.getAttribute("title");

      console.log(`Hovered over: ${countryName}`); // Debugging

      if (!countryName || !countries.includes(countryName)) return;

      const idx = countries.indexOf(countryName);
      console.log(`Country index: ${idx}`);

      // Get data for 2021 and 2022 from wealthEstimatesByCountry
      const wealth2021 = wealthEstimatesByCountry[21].totalWealth[idx] || "N/A";
      const wealth2022 = wealthEstimatesByCountry[22].totalWealth[idx] || "N/A";

      const percentChange =
        wealth2021 !== "N/A" && wealth2022 !== "N/A"
          ? (((wealth2022 - wealth2021) / wealth2021) * 100).toFixed(2) + "%"
          : "N/A";

      // Get wealth data for all years using wealthEstimatesByCountry
      const wealthData = years.map((year, yearIndex) => {
        const yearData = wealthEstimatesByCountry[yearIndex];
        const value =
          yearData && yearData.totalWealth
            ? yearData.totalWealth[idx] || null
            : null;
        console.log(`Year ${year} value for ${countryName}:`, value);
        return value;
      });

      // Create HTML content for tooltip
      tooltip.innerHTML = `
        <strong>${countryName}</strong><br>
        Wealth 2021: $${wealth2021}B<br>
        Wealth 2022: $${wealth2022}B<br>
        Change: ${percentChange}<br>
        <div class="chart-container">
          <canvas id="wealthChart"></canvas>
        </div>
      `;

      // Make sure Chart.js is loaded before creating the chart
      if (isChartJsLoaded()) {
        // Create the chart
        const ctx = document.getElementById("wealthChart").getContext("2d");
        createChart(ctx, years, wealthData);
      } else {
        console.error("Chart.js is still not loaded!");
      }

      tooltip.style.display = "block";
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;

      path.style.fill = "#dee2e6"; // Highlight effect
    });
    path.addEventListener("mousemove", (event) => {
      // Get window width
      const windowWidth = window.innerWidth;
      // Determine if mouse is on the right half of the screen
      const isRightSide = event.pageX > windowWidth / 2;

      // Position tooltip on the left if mouse is on right side, and vice versa
      if (isRightSide) {
        tooltip.style.left = `${event.pageX - 270}px`; // Move tooltip to the left of cursor
      } else {
        tooltip.style.left = `${event.pageX + 20}px`; // Keep tooltip to the right of cursor
      }

      tooltip.style.top = `${event.pageY - 100}px`;
    });

    path.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
      path.style.fill = ""; // Reset color
    });
  });
}
