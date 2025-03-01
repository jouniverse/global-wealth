let sectionTwoOne = document.getElementById("section-2-1");
sectionTwoOne.innerHTML = `<p class="txt-column">High-net-worth individuals by country.</p><div id="hnwi-country" class="dropdown">
<div id="select-hnwi-country" class="select">
  <span id="selected-hnwi-country" class="selected">Select</span>
  <div class="caret"></div>
</div>
<ul class="menu"></ul>
</div>
<canvas id="hnwi-country-chart"></canvas>
<details id="hnwi-country-info"><summary id="hnwi-country-summary">HNWI by country</summary></details>
`;

let nameOfDoubleSliderCountry = "hnwi-country-statistic-double-slider";

let sectionTwoTwo = document.getElementById("section-2-2");
sectionTwoTwo.innerHTML = `<p class="txt-column">High-net-worth individuals by country ranked by the number of adults from top to bottom.</p><div id="hnwi-country-statistic" class="dropdown">
<div id="select-hnwi-country-statistic" class="select">
  <span id="selected-hnwi-country-statistic" class="selected">Select</span>
  <div class="caret"></div>
</div>
<ul class="menu"></ul>
</div>

<div class="slider-double" id="${nameOfDoubleSliderCountry}"><div class="slider-double slider-values">
      <div class="slider-double slider-values-container">
        <span class="slider-double" id="range-1-${nameOfDoubleSliderCountry}"> </span>
        <span class="slider-double"> &dash; </span>
        <span class="slider-double" id="range-2-${nameOfDoubleSliderCountry}"> </span>
      </div>
    </div>

    <div class="slider-double wrapper">
      <div class="slider-double slider-legend-container">
        <div class="slider-double slider-track-${nameOfDoubleSliderCountry}"></div>
        <input class="slider-double" type="range" min="1" max="7" value="2" id="slider-1-${nameOfDoubleSliderCountry}" />
        <input class="slider-double" type="range" min="1" max="7" value="5" id="slider-2-${nameOfDoubleSliderCountry}" />
      </div>
    </div>
  </div>

<canvas id="hnwi-country-statistic-chart"></canvas>
<details id="hnwi-country-statistic-info"><summary id="hnwi-country-statistic-summary">HNWI by statistic</summary></details>
`;

let hnwiCountryInfo = document.getElementById("hnwi-country-info");
hnwiCountryInfo.style.display = "none";
let hnwiCountryStatisticInfo = document.getElementById(
  "hnwi-country-statistic-info"
);
hnwiCountryStatisticInfo.style.display = "none";
let hnwiCountryChart = document.getElementById("hnwi-country-chart");
hnwiCountryChart.style.display = "none";
let hnwiCountryStatisticChart = document.getElementById(
  "hnwi-country-statistic-chart"
);
hnwiCountryStatisticChart.style.display = "none";
let hnwiCountryDoubleSlider = document.getElementById(
  nameOfDoubleSliderCountry
);
hnwiCountryDoubleSlider.style.display = "none";

let hnwiStatisticMenuItems = [
  "Wealth 1-5M",
  "Wealth 5-10M",
  "Wealth 10-50M",
  "Wealth 50-100M",
  "Wealth 100-500M",
  "Wealth 500M+",
];

let hnwiCountryData;
let hnwiStatisticData;

let hnwiDoubleSliderData = { x: [], y: [] };
let hnwiDoubleSliderRangeData;

function init_hnwi_country() {
  addDropDown(
    hnwiCountryMarket.toSorted(),
    "hnwi-country",
    "section-2-1",
    "selected-hnwi-country",
    "select-hnwi-country"
  );

  addDropDown(
    hnwiStatisticMenuItems,
    "hnwi-country-statistic",
    "section-2-2",
    "selected-hnwi-country-statistic",
    "select-hnwi-country-statistic"
  );

  let selectedHnwiCountry = document.getElementById("selected-hnwi-country");

  setTimeout(() => {
    triggerChangeEvent(selectedHnwiCountry);
  }, 100);

  selectedHnwiCountry.addEventListener("selectedChange", (e) => {
    hnwiCountryChart.style.display = "block";
    hnwiCountryInfo.style.display = "block";
    if (
      selectedHnwiCountry.innerText === "Select" ||
      selectedHnwiCountry.innerText === ""
    ) {
      hnwiCountryChart.style.display = "none";
      hnwiCountryInfo.style.display = "none";
      return;
    }

    hnwiCountryData = getHnwiCountryData(
      hnwiCountry,
      selectedHnwiCountry.innerText
    );

    hnwiByCountryBarChart.data.labels = labels;
    hnwiByCountryBarChart.data.datasets[0].data = hnwiCountryData;

    hnwiCountryInfo.innerHTML = `<summary id="hnwi-country-summary">HNWI by country [number of adults]</summary><div>${
      selectedHnwiCountry.innerText
    }</div><div>${labels[0]}: ${hnwiCountryData[0]} ; ${roundTo(
      (hnwiCountryData[0] / hnwiWorld[0]) * 100,
      3
    )} % of world total</div><div>${labels[1]}: ${
      hnwiCountryData[1]
    } ; ${roundTo(
      (hnwiCountryData[1] / hnwiWorld[1]) * 100,
      3
    )} % of world total</div><div>${labels[2]}: ${
      hnwiCountryData[2]
    } ; ${roundTo(
      (hnwiCountryData[2] / hnwiWorld[2]) * 100,
      3
    )} % of world total</div><div>${labels[3]}: ${
      hnwiCountryData[3]
    } ; ${roundTo(
      (hnwiCountryData[3] / hnwiWorld[3]) * 100,
      3
    )} % of world total</div><div>${labels[4]}: ${
      hnwiCountryData[4]
    } ; ${roundTo(
      (hnwiCountryData[4] / hnwiWorld[4]) * 100,
      3
    )} % of world total</div><div>${labels[5]}: ${
      hnwiCountryData[5]
    } ; ${roundTo(
      (hnwiCountryData[5] / hnwiWorld[5]) * 100,
      3
    )} % of world total</div>`;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      hnwiByCountryBarChart.options.plugins.tooltip.titleFont.size = 14;
      hnwiByCountryBarChart.options.plugins.tooltip.bodyFont.size = 16;
      hnwiByCountryBarChart.options.aspectRatio = 1;
      hnwiByCountryBarChart.data.datasets[0].borderWidth = 1;
    }

    hnwiByCountryBarChart.update();
  });

  let selectedHnwiCountryStatistic = document.getElementById(
    "selected-hnwi-country-statistic"
  );

  setTimeout(() => {
    triggerChangeEvent(selectedHnwiCountryStatistic);
  }, 100);

  selectedHnwiCountryStatistic.addEventListener("selectedChange", (e) => {
    hnwiCountryStatisticChart.style.display = "block";
    hnwiCountryStatisticInfo.style.display = "block";
    hnwiCountryDoubleSlider.style.display = "block";
    if (
      selectedHnwiCountryStatistic.innerText === "Select" ||
      selectedHnwiCountryStatistic.innerText === ""
    ) {
      hnwiCountryStatisticChart.style.display = "none";
      hnwiCountryStatisticInfo.style.display = "none";
      hnwiCountryDoubleSlider.style.display = "none";
      return;
    }

    let indicator;
    switch (selectedHnwiCountryStatistic.innerText) {
      case "Wealth 1-5M":
        indicator = "wealth_1_5m";
        break;
      case "Wealth 5-10M":
        indicator = "wealth_5_10m";
        break;
      case "Wealth 10-50M":
        indicator = "wealth_10_50m";
        break;
      case "Wealth 50-100M":
        indicator = "wealth_50_100m";
        break;
      case "Wealth 100-500M":
        indicator = "wealth_100_500m";
        break;
      case "Wealth 500M+":
        indicator = "wealth_500_plus";
        break;
      default:
        break;
    }

    hnwiStatisticData = sortByIndex(hnwiCountry.market, hnwiCountry[indicator]);

    hnwiDoubleSliderData.y = hnwiStatisticData.sortedProperty;
    hnwiDoubleSliderRangeData = hnwiStatisticData.sortedProperty.slice(
      0,
      hnwiStatisticData.sortedProperty.length
    );
    for (i = 0; i < hnwiStatisticData.sortedProperty.length; i++) {
      hnwiDoubleSliderData.x.push(i);
    }

    let sliderOne = document.getElementById(
      `slider-1-${nameOfDoubleSliderCountry}`
    );
    let displayValOne = document.getElementById(
      `range-1-${nameOfDoubleSliderCountry}`
    );
    let sliderTwo = document.getElementById(
      `slider-2-${nameOfDoubleSliderCountry}`
    );
    let displayValTwo = document.getElementById(
      `range-2-${nameOfDoubleSliderCountry}`
    );
    displayValOne.textContent = `Number of adults: ${hnwiStatisticData.sortedProperty[0]}`;
    displayValTwo.textContent = `${
      hnwiStatisticData.sortedProperty[
        hnwiStatisticData.sortedProperty.length - 1
      ]
    }`;

    hnwiCountryStatisticInfo.innerHTML = `<summary id="hnwi-country-statistic-summary">HNWI by country - ${
      selectedHnwiCountryStatistic.innerText
    }</summary><div>Range: ${naIfNaN(
      roundTo(range(hnwiStatisticData.sortedProperty), 3)
    )} adults</div><div>Max: ${naIfNaN(
      roundTo(max(hnwiStatisticData.sortedProperty), 3)
    )} adults</div><div>Min: ${naIfNaN(
      roundTo(min(hnwiStatisticData.sortedProperty), 3)
    )} adults</div><div>Mean: ${naIfNaN(
      roundTo(mean(hnwiStatisticData.sortedProperty), 3)
    )} adults</div><div>Median: ${naIfNaN(
      roundTo(median(hnwiStatisticData.sortedProperty), 3)
    )} adults</div>Std. Dev.: ${naIfNaN(
      roundTo(standardDeviation(hnwiStatisticData.sortedProperty), 3)
    )} adults`;

    hnwiByCountryStatisticBarChart.data.labels = hnwiStatisticData.sortedMarket;
    hnwiByCountryStatisticBarChart.data.datasets[0].data =
      hnwiStatisticData.sortedProperty.toReversed();
    hnwiByCountryStatisticBarChart.options.plugins.title.text = `HNWI by country - ${selectedHnwiCountryStatistic.innerText}`;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      hnwiByCountryStatisticBarChart.options.plugins.tooltip.titleFont.size = 14;
      hnwiByCountryStatisticBarChart.options.plugins.tooltip.bodyFont.size = 16;
      hnwiByCountryStatisticBarChart.options.aspectRatio = 1;
      hnwiByCountryStatisticBarChart.data.datasets[0].borderWidth = 1;
    }

    hnwiByCountryStatisticBarChart.update();

    addDoubleSlider(
      hnwiDoubleSliderData,
      hnwiDoubleSliderRangeData,
      nameOfDoubleSliderCountry,
      false,
      (sliderOneValue, sliderTwoValue) => {
        hnwiStatisticData = sortByIndex(
          hnwiCountry.market,
          hnwiCountry[indicator]
        );

        displayValOne.textContent = `Number of adults: ${
          hnwiDoubleSliderRangeData[sliderOne.value]
        }`;
        displayValTwo.textContent = `${
          hnwiDoubleSliderRangeData[sliderTwo.value]
        }`;

        hnwiDoubleSliderData.y = hnwiStatisticData.sortedProperty;
        hnwiCountryStatisticInfo.innerHTML = `<summary id="hnwi-country-statistic-summary">HNWI by country - ${
          selectedHnwiCountryStatistic.innerText
        }</summary><div>Range: ${naIfNaN(
          roundTo(
            range(
              hnwiStatisticData.sortedProperty.slice(
                Number(sliderOneValue),
                Number(sliderTwoValue) + 1
              )
            ),
            3
          )
        )} adults</div><div>Max: ${naIfNaN(
          roundTo(
            max(
              hnwiStatisticData.sortedProperty.slice(
                Number(sliderOneValue),
                Number(sliderTwoValue) + 1
              )
            ),
            3
          )
        )} adults</div><div>Min: ${naIfNaN(
          roundTo(
            min(
              hnwiStatisticData.sortedProperty.slice(
                Number(sliderOneValue),
                Number(sliderTwoValue) + 1
              )
            ),
            3
          )
        )} adults</div><div>Mean: ${naIfNaN(
          roundTo(
            mean(
              hnwiStatisticData.sortedProperty.slice(
                Number(sliderOneValue),
                Number(sliderTwoValue) + 1
              )
            ),
            3
          )
        )} adults</div><div>Median: ${naIfNaN(
          roundTo(
            median(
              hnwiStatisticData.sortedProperty.slice(
                Number(sliderOneValue),
                Number(sliderTwoValue) + 1
              )
            ),
            3
          )
        )} adults</div>Std. Dev.: ${naIfNaN(
          roundTo(
            standardDeviation(
              hnwiStatisticData.sortedProperty.slice(
                Number(sliderOneValue),
                Number(sliderTwoValue) + 1
              )
            ),
            3
          )
        )} adults`;

        //  update chart
        hnwiByCountryStatisticBarChart.data.labels =
          hnwiStatisticData.sortedMarket.slice(
            Number(sliderOneValue),
            Number(sliderTwoValue) + 1
          );
        hnwiByCountryStatisticBarChart.data.datasets[0].data =
          hnwiStatisticData.sortedProperty.slice(
            Number(sliderOneValue),
            Number(sliderTwoValue) + 1
          );
        hnwiByCountryStatisticBarChart.update();
      }
    );
  });
}

let hnwiByCountryBarChart = new Chart("hnwi-country-chart", {
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
        borderWidth: 2,
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
        text: "HNWI by country [number of adults]",
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

let hnwiByCountryStatisticBarChart = new Chart("hnwi-country-statistic-chart", {
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
        borderWidth: 2,
        borderRadius: 30,
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
        text: "HNWI by country [top N countries]",
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
