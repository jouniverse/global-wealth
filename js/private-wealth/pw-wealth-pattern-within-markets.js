let sectionFive = document.getElementById("section-5");

sectionFive.innerHTML = `<p class="txt-column">Wealth pattern within markets by country.</p><div id="wealth-pattern" class="dropdown">
<div id="select-wealth-pattern" class="select">
  <span id="selected-wealth-pattern" class="selected">Select</span>
  <div class="caret"></div>
</div>
<ul class="menu"></ul>
</div>
<canvas id="wealth-pattern-chart"></canvas>
<canvas id="wealth-pattern-statistic-chart"></canvas>
<div id="wealth-pattern-world"></div>
<details id="wealth-pattern-info"><summary id="wealth-pattern-summary">Wealth pattern within markets info</summary></details>`;

let wealthPatternInfo = document.getElementById("wealth-pattern-info");
wealthPatternInfo.style.display = "none";
let wealthPatternChart = document.getElementById("wealth-pattern-chart");
wealthPatternChart.style.display = "none";
let wealthPatternStatisticChart = document.getElementById(
  "wealth-pattern-statistic-chart"
);
wealthPatternStatisticChart.style.display = "none";

let wealthPatternStatisticsLabels = [
  "Adults",
  "Mean wealth per adult",
  "Median wealth per adult",
];

// %
let wealthPatternDistributionLabels = [
  "Wealth < 10k",
  "Wealth 10k - 100k",
  "Wealth 100k - 1M",
  "Wealth > 1M",
  "Gini coefficient",
];

let wealthPatternStatisticData;
let wealthPatternData;

function init_wealth_pattern() {
  addDropDown(
    wealthPatternWithinMarketsCountry.market,
    "wealth-pattern",
    "section-5",
    "selected-wealth-pattern",
    "select-wealth-pattern"
  );

  let selectedWealthPattern = document.getElementById(
    "selected-wealth-pattern"
  );

  setTimeout(() => {
    triggerChangeEvent(selectedWealthPattern);
  }, 100);

  selectedWealthPattern.addEventListener("selectedChange", (e) => {
    wealthPatternChart.style.display = "block";
    wealthPatternStatisticChart.style.display = "block";
    wealthPatternInfo.style.display = "block";
    if (
      selectedWealthPattern.innerText === "Select" ||
      !selectedWealthPattern.innerText
    ) {
      wealthPatternChart.style.display = "none";
      wealthPatternStatisticChart.style.display = "none";
      wealthPatternInfo.style.display = "none";
      return;
    }

    wealthPatternStatisticData = getWealthPatternWithinMarketsData(
      wealthPatternWithinMarketsCountry,
      selectedWealthPattern.innerText
    )[0];
    wealthPatternData = getWealthPatternWithinMarketsData(
      wealthPatternWithinMarketsCountry,
      selectedWealthPattern.innerText
    )[1];

    let wealthPatternWorldData = generateWorldDataTable(
      wealthPatternWithinMarketsRegion
    );
    let summary = document.getElementById("wealth-pattern-world");
    summary.innerHTML = wealthPatternWorldData;

    wealthPatternInfo.innerHTML = `<summary id="wealth-pattern-summary">Wealth pattern within markets</summary><div><div>${
      selectedWealthPattern.innerText
    }:</div><div>Mean = ${wealthPatternStatisticData[1]} USD : ${roundTo(
      (wealthPatternStatisticData[1] /
        wealthPatternWithinMarketsRegion.mean_wealth_per_adult_usd[8]) *
        100,
      3
    )} % of global mean</div><div>Median = ${
      wealthPatternStatisticData[2]
    } USD : ${roundTo(
      (wealthPatternStatisticData[2] /
        wealthPatternWithinMarketsRegion.median_wealth_per_adult_usd[8]) *
        100,
      3
    )} % of global median</div><div>Gini = ${
      wealthPatternData[4]
    } % : ${roundTo(
      ((wealthPatternData[4] - wealthPatternWithinMarketsRegion.gini[8]) /
        wealthPatternWithinMarketsRegion.gini[8]) *
        100,
      3
    )} ${
      roundTo(
        ((wealthPatternData[4] - wealthPatternWithinMarketsRegion.gini[8]) /
          wealthPatternWithinMarketsRegion.gini[8]) *
          100,
        3
      ) < 0
        ? "% better than global Gini"
        : " % worse than global Gini"
    }</div>`;

    wealthPatternBarChart.data.labels = wealthPatternDistributionLabels;
    wealthPatternBarChart.data.datasets[0].data = wealthPatternData;
    //
    wealthPatternStatisticBarChart.data.labels = wealthPatternStatisticsLabels;
    wealthPatternStatisticBarChart.data.datasets[0].data =
      wealthPatternStatisticData;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      wealthPatternBarChart.options.plugins.tooltip.titleFont.size = 14;
      wealthPatternBarChart.options.plugins.tooltip.bodyFont.size = 16;
      wealthPatternBarChart.options.aspectRatio = 1;
      wealthPatternBarChart.data.datasets[0].borderWidth = 1;

      wealthPatternStatisticBarChart.options.plugins.tooltip.titleFont.size = 14;
      wealthPatternStatisticBarChart.options.plugins.tooltip.bodyFont.size = 16;
      wealthPatternStatisticBarChart.options.aspectRatio = 1;
      wealthPatternStatisticBarChart.data.datasets[0].borderWidth = 1;
    }

    wealthPatternBarChart.update();
    wealthPatternStatisticBarChart.update();
  });
}

let wealthPatternBarChart = new Chart("wealth-pattern-chart", {
  type: "bar",
  data: {
    title: "",
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgba(233, 236, 239, 0.3)",
        hoverBackgroundColor: colorsHEX.antiflashWhite,
        borderColor: colorsHEX.antiflashWhite,
        borderWidth: 3,
        borderRadius: 70,
        borderSkipped: false,
        barPercentage: 0.6,
        stack: "stack 0",
        yAxisID: "y",
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Wealth pattern within markets  2022",
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return "";
          },
          label: function (context) {
            let lblArray = [];
            if (context.dataIndex < 4) {
              lblArray.push(
                `${wealthPatternDistributionLabels[context.dataIndex]} USD`
              );
            } else {
              lblArray.push(
                `${wealthPatternDistributionLabels[context.dataIndex]}`
              );
            }
            lblArray.push(`${context.parsed.y} %`);
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

let wealthPatternStatisticBarChart = new Chart(
  "wealth-pattern-statistic-chart",
  {
    type: "bar",
    data: {
      title: "",
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "rgba(233, 236, 239, 0.3)",
          hoverBackgroundColor: colorsHEX.antiflashWhite,
          borderColor: colorsHEX.antiflashWhite,
          borderWidth: 3,
          borderRadius: 70,
          borderSkipped: false,
          barPercentage: 0.6,
          stack: "stack 0",
          yAxisID: "y",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let indicator = [
                "Adults",
                "Mean wealth per adult",
                "Median wealth per adult",
              ];
              let units = ["thousand", "USD", "USD"];
              let lblArray = [];
              lblArray.push(
                `${indicator[context.dataIndex]}: ${context.parsed.y} ${
                  units[context.dataIndex]
                }`
              );
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
  }
);
