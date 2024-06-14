let sectionFour = document.getElementById("section-4");
sectionFour.innerHTML += `<p class="txt-column">
  Market details for selected markets. GDP in 2022 USD ($) and wealth per adult in 2000 and 2022.
  </p>
  <div id="market-details" class="dropdown">
    <div id="select-market-details" class="select">
      <span id="selected-market-details" class="selected">Select</span>
      <div class="caret"></div>
    </div>
    <ul class="menu"></ul>
</div>
  <canvas id="market-details-chart"></canvas>
  <details id="market-details-info"><summary id="market-details-summary">Info</summary></details>
  `;

let marketDetailsInfo = document.getElementById("market-details-info");
marketDetailsInfo.style.display = "none";
let marketDetailsChart = document.getElementById("market-details-chart");
marketDetailsChart.style.display = "none";
let marketDetailsUsdData;

function init_market_details() {
  addDropDown(
    marketDetails.market,
    "market-details",
    "section-4",
    "selected-market-details",
    "select-market-details"
  );

  let selectedMarketDetails = document.getElementById(
    "selected-market-details"
  );

  setTimeout(() => {
    triggerChangeEvent(selectedMarketDetails);
  }, 100);

  selectedMarketDetails.addEventListener("selectedChange", (e) => {
    marketDetailsChart.style.display = "block";
    marketDetailsInfo.style.display = "block";
    if (
      selectedMarketDetails.innerText === "Select" ||
      selectedMarketDetails.innerText === ""
    ) {
      marketDetailsChart.style.display = "none";
      marketDetailsInfo.style.display = "none";
      return;
    }

    let marketDetailsData = getMarketDetailsArray(
      getMarketDetails(findMarketDetailsIdx(selectedMarketDetails.innerText))[0]
    );
    marketDetailsBarChart.data.datasets[0].data = marketDetailsData;
    marketDetailsBarChart.options.plugins.title.text = `Market details for ${selectedMarketDetails.innerText}`;
    marketDetailsBarChart.options.plugins.legend.labels.boxWidth = 0;
    let marketDetailsSummary = getMarketDetails(
      findMarketDetailsIdx(selectedMarketDetails.innerText)
    )[0];
    let changeInWealth =
      isNaN(
        ((marketDetailsSummary.wealthPerAdult_2022 -
          marketDetailsSummary.wealthPerAdult_2000) /
          marketDetailsSummary.wealthPerAdult_2000) *
          100
      ) == true
        ? "n.a"
        : ((marketDetailsSummary.wealthPerAdult_2022 -
            marketDetailsSummary.wealthPerAdult_2000) /
            marketDetailsSummary.wealthPerAdult_2000) *
          100;
    marketDetailsInfo.innerHTML = `<summary>Market information</summary><div>Market: ${
      marketDetailsSummary.market
    }</div><div>Region: ${
      marketDetailsSummary.region
    }</div><div>Income group: ${
      marketDetailsSummary.incomeGroup
    }</div><div>Total wealth: ${
      marketDetailsSummary.totalWealth_2022 == null
        ? "n.a"
        : marketDetailsSummary.totalWealth_2022
    } USD Bn</div><div>Change in wealth per adult (00' to 22'): ${
      changeInWealth == "n.a" ? "n.a" : changeInWealth.toFixed(2)
    } %</div><div>Share of world wealth: ${
      marketDetailsSummary.shareOfWorldWealth_2022 == null
        ? "n.a"
        : marketDetailsSummary.shareOfWorldWealth_2022
    } %</div><div>Data quality: ${
      marketDetailsSummary.wealthDataQuality
    }</div>`;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      marketDetailsBarChart.options.plugins.tooltip.titleFont.size = 14;
      marketDetailsBarChart.options.plugins.tooltip.bodyFont.size = 16;
      marketDetailsBarChart.options.aspectRatio = 1;
    }

    marketDetailsBarChart.update();
  });
}

let marketDetailsBarChart = new Chart("market-details-chart", {
  type: "bar",
  data: {
    labels: ["GDP per adult", "Wealth per adult 00'", "Wealth per adult 22'"],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgba(233, 236, 239, 0.3)",
        hoverBackgroundColor: colorsHEX.antiflashWhite,
        borderColor: colorsHEX.antiflashWhite,
        borderWidth: 5,
        borderRadius: 72,
        borderSkipped: false,
        barPercentage: 0.4,
        stack: "stack 0",
        yAxisID: "y",
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Market details",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let lblArray = [];
            lblArray.push(`${context.parsed.y} USD`);
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
    },
  },
});
