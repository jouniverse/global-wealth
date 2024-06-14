let sectionOne = document.getElementById("section-1");
sectionOne.innerHTML += `<p class="txt-column">High-net-worth individuals by region in 2022. Number of adults and the percentage membership of global total by wealth category.</p><div id="hnwi-region" class="dropdown">
<div id="select-hnwi-region" class="select">
  <span id="selected-hnwi-region" class="selected">Select</span>
  <div class="caret"></div>
</div>
<ul class="menu"></ul>
</div>
<canvas id="hnwi-region-usd-chart"></canvas>
<details id="hnwi-region-usd-info"><summary id="hnwi-region-usd-summary">HNWI by region USD</summary></details>
<canvas id="hnwi-region-pct-chart"></canvas>
<details id="hnwi-region-pct-info"><summary id="hnwi-region-pct-summary">HNWI by region %</summary></details>`;

let hnwiRegionInfo = document.getElementById("hnwi-region-usd-info");
hnwiRegionInfo.style.display = "none";
let hnwiRegionPctInfo = document.getElementById("hnwi-region-pct-info");
hnwiRegionPctInfo.style.display = "none";
let hnwiRegionChart = document.getElementById("hnwi-region-usd-chart");
hnwiRegionChart.style.display = "none";
let hnwiRegionPctChart = document.getElementById("hnwi-region-pct-chart");
hnwiRegionPctChart.style.display = "none";

let labels = [
  "Wealth 1-5M",
  "Wealth 5-10M",
  "Wealth 10-50M",
  "Wealth 50-100M",
  "Wealth 100-500M",
  "Wealth 500M+",
];

let hnwiRegionData = [];

function init_hnwi_region() {
  addDropDown(
    hnwiRegionUsdMarket,
    "hnwi-region",
    "section-1",
    "selected-hnwi-region",
    "select-hnwi-region"
  );

  let selectedHnwiRegion = document.getElementById("selected-hnwi-region");

  setTimeout(() => {
    triggerChangeEvent(selectedHnwiRegion);
  }, 100);

  selectedHnwiRegion.addEventListener("selectedChange", (e) => {
    hnwiRegionChart.style.display = "block";
    hnwiRegionPctChart.style.display = "block";
    hnwiRegionInfo.style.display = "block";
    hnwiRegionPctInfo.style.display = "block";
    if (
      selectedHnwiRegion.innerText === "Select" ||
      selectedHnwiRegion.innerText == ""
    ) {
      hnwiRegionChart.style.display = "none";
      hnwiRegionPctChart.style.display = "none";
      hnwiRegionInfo.style.display = "none";
      hnwiRegionPctInfo.style.display = "none";
      return;
    }

    let hnwiRegionIdx = hnwiRegionUsdMarket.indexOf(
      selectedHnwiRegion.innerText
    );
    hnwiRegionData = getHnwiRegionData(
      hnwiRegionUSD,
      hnwiRegionPct,
      hnwiRegionIdx
    );

    hnwiByRegionUSDBarChart.data.datasets[0].data = hnwiRegionData[0];
    hnwiByRegionUSDBarChart.data.labels = labels;
    hnwiByRegionPctBarChart.data.datasets[0].data = hnwiRegionData[1];
    hnwiByRegionPctBarChart.data.labels = labels;

    hnwiRegionInfo.innerHTML = `<summary id="hnwi-region-usd-summary">HNWI by Region USD</summary><div>Region: ${selectedHnwiRegion.innerText}</div><div>${labels[0]}: ${hnwiRegionData[0][0]}</div><div>${labels[1]}: ${hnwiRegionData[0][1]}</div><div>${labels[2]}: ${hnwiRegionData[0][2]}</div><div>${labels[3]}: ${hnwiRegionData[0][3]}</div><div>${labels[4]}: ${hnwiRegionData[0][4]}</div><div>${labels[5]}: ${hnwiRegionData[0][5]}</div>`;

    hnwiRegionPctInfo.innerHTML = `<summary id="hnwi-region-pct-summary">HNWI by Region %</summary><div>Region: ${selectedHnwiRegion.innerText}</div><div>${labels[0]}: ${hnwiRegionData[1][0]} % of world total</div><div>${labels[1]}: ${hnwiRegionData[1][1]} % of world total</div><div>${labels[2]}: ${hnwiRegionData[1][2]} % of world total</div><div>${labels[3]}: ${hnwiRegionData[1][3]} % of world total</div><div>${labels[4]}: ${hnwiRegionData[1][4]} % of world total</div><div>${labels[5]}: ${hnwiRegionData[1][5]} % of world total</div>`;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      hnwiByRegionUSDBarChart.options.plugins.tooltip.titleFont.size = 14;
      hnwiByRegionUSDBarChart.options.plugins.tooltip.bodyFont.size = 16;
      hnwiByRegionUSDBarChart.options.aspectRatio = 1;
      hnwiByRegionUSDBarChart.data.datasets[0].borderWidth = 1;

      hnwiByRegionPctBarChart.options.plugins.tooltip.titleFont.size = 14;
      hnwiByRegionPctBarChart.options.plugins.tooltip.bodyFont.size = 16;
      hnwiByRegionPctBarChart.options.aspectRatio = 1;
      hnwiByRegionPctBarChart.data.datasets[0].borderWidth = 1;
    }

    hnwiByRegionUSDBarChart.update();
    hnwiByRegionPctBarChart.update();
  });
}

Chart.defaults.color = colorsHEX.platinum;

let hnwiByRegionUSDBarChart = new Chart("hnwi-region-usd-chart", {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgba(233, 236, 239, 0.3)",
        hoverBackgroundColor: colorsHEX.antiflashWhite,
        borderColor: colorsHEX.antiflashWhite,
        borderWidth: 3,
        borderRadius: 40,
        borderSkipped: false,
        barPercentage: 0.8,
        stack: "stack 0",
        yAxisID: "y",
      },
    ],
  },
  options: {
    aspectRatio: 2,
    plugins: {
      title: {
        display: true,
        text: "HNWI by region USD",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let lblArray = [];
            lblArray.push(`${context.parsed.y} adults`);
            return lblArray;
          },
        },
        displayColors: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: colorsHEX.seasalt,
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: "logarithmic",
        position: "left",
        ticks: {
          color: colorsHEX.seasalt,
        },
        grid: {
          display: false,
        },
      },
    },
  },
});

let hnwiByRegionPctBarChart = new Chart("hnwi-region-pct-chart", {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgba(233, 236, 239, 0.3)",
        hoverBackgroundColor: colorsHEX.antiflashWhite,
        borderColor: colorsHEX.antiflashWhite,
        borderWidth: 3,
        borderRadius: 40,
        borderSkipped: false,
        barPercentage: 0.8,
        stack: "stack 0",
        yAxisID: "y",
      },
    ],
  },
  options: {
    aspectRatio: 2,
    plugins: {
      title: {
        display: true,
        text: "HNWI by region %",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let lblArray = [];
            lblArray.push(`${context.parsed.y} % of world total`);
            return lblArray;
          },
        },
        displayColors: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: colorsHEX.seasalt,
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: "linear",
        position: "left",
        ticks: {
          color: colorsHEX.seasalt,
        },
        grid: {
          display: false,
        },
      },
    },
  },
});
