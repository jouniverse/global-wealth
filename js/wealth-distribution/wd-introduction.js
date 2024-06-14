let distributionRegions = [
  "Africa",
  "Asia-Pacific",
  "China",
  "Europe",
  "India",
  "Latin America",
  "North America",
  "World",
];

let sectionZero = document.getElementById("section-0");
sectionZero.innerHTML += `<p class="txt-column intro-txt">The objective of the <strong><a href="https://www.ubs.com/global/en/family-office-uhnw/reports/global-wealth-report-2023.html"> UBS Global Wealth report </a></strong> is to present estimations of household wealth across the globe for each year starting from 2000. Specifically, the report focuses on analyzing the distribution of individual net worth within and across various markets. Individual net worth is defined as the marketable value of financial assets and non-financial assets (primarily housing and land) minus debts. Notably, no single market worldwide possesses a comprehensive source of information on personal wealth, and numerous low- and middle-income markets lack substantial direct evidence. To formulate the global wealth distribution, the report combines the wealth level of each market with details of its wealth pattern. In recent years, significant advancements have been made in the examination of global household wealth, with improved data quality and increased availability for more markets. Despite this progress, there is still much work to be done to enhance the quality and frequency of wealth data and to expand data availability to a greater number of markets.</p><hr>
<canvas id="wealth-distribution-map"></canvas>`;

let sectionOne = document.getElementById("section-1");
sectionOne.innerHTML += `<p class="txt-column">
  Total wealth distribution by region from 2000 to 2022 in USD Bn. Smoothed and current exchange rates are shown separately.
  </p>
  <div id="total-wealth-by-region" class="dropdown">
    <div id="select-region-total-wealth" class="select">
      <span id="selected-region-total-wealth" class="selected">Select</span>
      <div class="caret"></div>
    </div>
    <ul class="menu"></ul>
</div>
  <canvas id="total-wealth-by-region-chart"></canvas>
  `;

let sectionTwo = document.getElementById("section-2");
sectionTwo.innerHTML += `<p class="txt-column">
Wealth distribution by wealth range from poorest to richest in USD Bn for selected markets. The wealth range bins cover wealth from below 10k to wealth above 500M.
</p>
<div id="wealth-distribution-by-country" class="dropdown">
  <div id="select-wealth-distribution" class="select">
    <span id="selected-wealth-distribution" class="selected">Select</span>
    <div class="caret"></div>
  </div>
  <ul class="menu"></ul>
  </div>
  <canvas id="wealth-distribution-by-country-chart"></canvas>`;

let wealthDistributionMap = document.getElementById("wealth-distribution-map");
// wealthDistributionMap.style.display = "none";

let mapData = [];
for (let i = 0; i < countryBoundaries.geoPointX.length; i++) {
  mapData.push({
    x: countryBoundaries.geoPointY[i],
    y: countryBoundaries.geoPointX[i],
  });
}

if (detectMobile()) {
  wealthDistributionMap.style.display = "none";
}

// console.log(mapData);

let totalWealthChart = document.getElementById("total-wealth-by-region-chart");
totalWealthChart.style.display = "none";
let wealthDistributionChart = document.getElementById(
  "wealth-distribution-by-country-chart"
);
wealthDistributionChart.style.display = "none";

let totalWealthByRegion;
// Percentage of world adults (in %)
let wealthDistributionByCountryPctOfWorldAdults;
// Number of adults by wealth range (in %)
let wealthDistributionByCountry;

function init_introduction() {
  addDropDown(
    distributionRegions,
    "total-wealth-by-region",
    "section-1",
    "selected-region-total-wealth",
    "select-region-total-wealth"
  );

  addDropDown(
    distributionOfWealthByCountryPctOfWorldMarket,
    "wealth-distribution-by-country",
    "section-2",
    "selected-wealth-distribution",
    "select-wealth-distribution"
  );

  let selectedTotalWealth = document.getElementById(
    "selected-region-total-wealth"
  );
  selectedTotalWealth.addEventListener("selectedChange", () => {
    totalWealthChart.style.display = "block";
    totalWealthByRegion = selectedTotalWealth.innerText;
    if (totalWealthByRegion === "Select" || !totalWealthByRegion) {
      totalWealthChart.style.display = "none";
      return;
    }

    let stackOneData = getAnnualDistributionArray(
      getAnnualDistributionData(
        totalWealthRegion,
        selectedTotalWealth.innerText
      ),
      "odd"
    );
    let stackTwoData = getAnnualDistributionArray(
      getAnnualDistributionData(
        totalWealthRegion,
        selectedTotalWealth.innerText
      ),
      "even"
    );
    totalWealthBarChart.data.datasets[0].data = stackOneData;
    totalWealthBarChart.data.datasets[1].data = stackTwoData;
    totalWealthBarChart.data.datasets[0].label = `${selectedTotalWealth.innerText}: current exchange rate`;
    totalWealthBarChart.data.datasets[1].label = `${selectedTotalWealth.innerText}: smoothed exchange rate`;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      totalWealthBarChart.options.plugins.tooltip.titleFont.size = 14;
      totalWealthBarChart.options.plugins.tooltip.bodyFont.size = 16;
      totalWealthBarChart.options.aspectRatio = 1;
      totalWealthBarChart.data.datasets[0].borderWidth = 1;
      totalWealthBarChart.data.datasets[1].borderWidth = 1;
    }

    totalWealthBarChart.update();
  });

  let selectedWealthDistribution = document.getElementById(
    "selected-wealth-distribution"
  );

  setTimeout(() => {
    triggerChangeEvent(selectedWealthDistribution);
  }, 100);

  selectedWealthDistribution.addEventListener("selectedChange", () => {
    wealthDistributionChart.style.display = "block";
    if (
      selectedWealthDistribution.innerText === "Select" ||
      !selectedWealthDistribution.innerText
    ) {
      wealthDistributionChart.style.display = "none";
      return;
    }

    let stackOneData = getRegionalDistributionArray(
      getRegionalDistributionData(
        distributionOfWealthByCountryPctOfWorld,
        selectedWealthDistribution.innerText
      )
    );
    let stackTwoData = getRegionalDistributionArray(
      getRegionalDistributionData(
        distributionOfWealthByCountryPct,
        selectedWealthDistribution.innerText
      )
    );
    wealthDistributionBarChart.data.datasets[0].data = stackOneData;
    wealthDistributionBarChart.data.datasets[1].data = stackTwoData;
    wealthDistributionBarChart.data.datasets[0].label = `${selectedWealthDistribution.innerText} (% of world adults)`;
    wealthDistributionBarChart.data.datasets[1].label = `${selectedWealthDistribution.innerText} (number adults by wealth range)`;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      wealthDistributionBarChart.options.plugins.tooltip.titleFont.size = 14;
      wealthDistributionBarChart.options.plugins.tooltip.bodyFont.size = 16;
      wealthDistributionBarChart.options.plugins.legend.labels.boxWidth = 10;
      wealthDistributionBarChart.options.plugins.legend.labels.boxHeight = 1;
      wealthDistributionBarChart.options.aspectRatio = 1;
      wealthDistributionBarChart.data.datasets[0].borderWidth = 1;
      wealthDistributionBarChart.data.datasets[1].borderWidth = 1;
    }
    wealthDistributionBarChart.update();
  });
}

const wealthDistributionMapChart = new Chart("wealth-distribution-map", {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Global Wealth Distribution",
        data: mapData,
        pointStyle: "circle",
        pointBackgroundColor: colorsHEX.seasalt,
        hoverBackgroundColor: colorsHEX.eerieBlack,
        borderColor: [colorsHEX.frenchGray],
        borderWidth: 1,
        hoverBorderColor: [colorsHEX.eerieBlack],
        radius: 3,
        pointHoverRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        grid: {
          display: false,
        },
        display: false,
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        display: false,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context) {
            return "";
          },
          label: function (context) {
            let distributionCountries = countryBoundaries.name;
            let lblArray = [];
            lblArray.push(`${distributionCountries[context.dataIndex]}`);
            lblArray.push(
              `Net wealth 2021: ${
                year_2021.totalWealth[context.dataIndex]
              } USD Bn`
            );
            lblArray.push(
              `Net wealth 2022: ${
                year_2022.totalWealth[context.dataIndex]
              } USD Bn`
            );
            lblArray.push(
              `Change: ${roundTo(
                percentChange([
                  year_2021.totalWealth[context.dataIndex],
                  year_2022.totalWealth[context.dataIndex],
                ]),
                3
              )} %`
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
  },
});

let totalWealthBarChart = new Chart("total-wealth-by-region-chart", {
  type: "bar",
  data: {
    labels: years,
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgba(233, 236, 239, 0.3)",
        hoverBackgroundColor: colorsHEX.antiflashWhite,
        borderColor: colorsHEX.antiflashWhite,
        borderWidth: 5,
        borderRadius: 18,
        borderSkipped: false,
        barPercentage: 0.8,
        stack: "stack 0",
      },
      {
        label: "",
        data: [],
        backgroundColor: "rgba(52, 58, 64, 0.3)",
        hoverBackgroundColor: colorsHEX.onyx,
        borderColor: colorsHEX.onyx,
        borderWidth: 5,
        borderRadius: 18,
        borderSkipped: false,
        barPercentage: 0.8,
        stack: "stack 1",
      },
    ],
  },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let lblArray = [];
            lblArray.push(`${context.dataset.label}`);
            lblArray.push(`Total net wealth: ${context.parsed.y} USD Bn`);
            return lblArray;
          },
        },
        displayColors: false,
      },
      legend: {
        display: true,
        labels: {
          boxWidth: 10,
          boxHeight: 1,
        },
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

let wealthDistributionBarChart = new Chart(
  "wealth-distribution-by-country-chart",
  {
    type: "bar",
    data: {
      labels: [
        "Wealth: under 10k",
        "Wealth: 10k to 100k",
        "Wealth: 100k to 1M",
        "Wealth: over 1M",
        "Wealth: all ranges",
      ],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "rgba(233, 236, 239, 0.3)",
          hoverBackgroundColor: colorsHEX.antiflashWhite,
          borderColor: colorsHEX.antiflashWhite,
          borderWidth: 5,
          borderRadius: 36,
          borderSkipped: false,
          barPercentage: 0.5,
          stack: "stack 0",
          yAxisID: "y",
        },
        {
          label: "",
          data: [],
          backgroundColor: "rgba(52, 58, 64, 0.3)",
          hoverBackgroundColor: colorsHEX.onyx,
          borderColor: colorsHEX.onyx,
          borderWidth: 5,
          borderRadius: 36,
          borderSkipped: false,
          barPercentage: 0.5,
          stack: "stack 1",
          yAxisID: "y1",
        },
      ],
    },
    options: {
      legend: {
        display: true,
        labels: {
          boxWidth: 10,
          boxHeight: 1,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              let lblArray = [];
              lblArray.push(`${context.dataset.label}`);
              lblArray.push(`${context.parsed.y} %`);
              return lblArray;
            },
          },
          displayColors: false,
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
        y1: {
          type: "linear",
          position: "right",
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
