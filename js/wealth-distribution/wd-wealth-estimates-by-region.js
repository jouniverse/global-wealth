let nameOfDoubleSlider = "wealth-estimates-by-region-double";
let nameOfSingleSlider = "wealth-estimates-by-region-single";
let sectionSix = document.getElementById("section-6");
sectionSix.innerHTML += `<p class="txt-column">
  Regional wealth estimates from 2000 to 2022. Total wealth, share of wealth, wealth per adult, financial wealth, non-financial wealth, debt per adult and median wealth per adult are covered.
  </p>
  <div id="wealth-estimates-by-region" class="dropdown">
    <div id="select-wealth-estimates-by-region" class="select">
      <span id="selected-wealth-estimates-by-region" class="selected">Select</span>
      <div class="caret"></div>
    </div>
    <ul class="menu"></ul>
   </div>

   <div class="slider-double" id="${nameOfDoubleSlider}"><div class="slider-double slider-values">
      <div class="slider-double slider-values-container">
        <span class="slider-double" id="range-1-${nameOfDoubleSlider}"> </span>
        <span class="slider-double"> &dash; </span>
        <span class="slider-double" id="range-2-${nameOfDoubleSlider}"> </span>
      </div>
    </div>

    <div class="slider-double wrapper">
      <div class="slider-double slider-legend-container">
        <div class="slider-double slider-track-${nameOfDoubleSlider}"></div>
        <input class="slider-double" type="range" min="1" max="7" value="2" id="slider-1-${nameOfDoubleSlider}" />
        <input class="slider-double" type="range" min="1" max="7" value="5" id="slider-2-${nameOfDoubleSlider}" />
      </div>
    </div>
  </div>
  <div class="slider-single slider-single-container" id="${nameOfSingleSlider}">
        <div class="slider-single slider-values">
          <div class="slider-single slider-values-container">
            <span class="slider-single" id="year-range-${nameOfSingleSlider}"> </span>
          </div>
        </div>
     
      <div class="slider-single wrapper">
        <div class="slider-single slider-legend-container">
          <div class="slider-single slider-track"></div>
          <input class="slider-single"
            type="range"
            min="2000"
            max="2022"
            value="2005"
            id="year-slider-${nameOfSingleSlider}"
          />
      </div>
    </div>
    </div>
    <canvas id="wealth-estimates-by-region-chart"></canvas>
    <details id="wealth-estimates-by-region-info"><summary id="wealth-estimates-by-region">Wealth estimates by region</summary></details>`;

let doubleSliderContainer = document.getElementById(nameOfDoubleSlider);
doubleSliderContainer.style.display = "none";
let singleSliderContainer = document.getElementById(nameOfSingleSlider);
singleSliderContainer.style.display = "none";
let wealthEstimatesByRegionChart = document.getElementById(
  "wealth-estimates-by-region-chart"
);
wealthEstimatesByRegionChart.style.display = "none";
let wealthEstimatesByRegionInfo = document.getElementById(
  "wealth-estimates-by-region-info"
);
wealthEstimatesByRegionInfo.style.display = "none";
let wealthEstimatesbyRegionMenu = [
  "Adults",
  "Share of adults",
  "Total wealth",
  "Share of wealth",
  "Wealth per adult",
  "Financial wealth",
  "Non-financial wealth",
  "Debt per adult",
  "Median wealth per adult",
];
let wealthEstimatesbyRegionData = [];
let wealthEstimatesByRegionDoubleSliderData = { x: [], y: [] };
let selectedWealthEstimateByRegionLbl;
let regionRange,
  regionMax,
  regionMin,
  regionMean,
  regionMedian,
  regionStdDev,
  regionVariance;

function init_wealth_estimates_by_region() {
  addDropDown(
    wealthEstimatesbyRegionMenu,
    "wealth-estimates-by-region",
    "section-6",
    "selected-wealth-estimates-by-region",
    "select-wealth-estimates-by-region"
  );

  let selectedWealthEstimatesByRegion = document.getElementById(
    "selected-wealth-estimates-by-region"
  );

  setTimeout(() => {
    triggerChangeEvent(selectedWealthEstimatesByRegion);
  }, 100);

  let yearIdx = wealthEstimatesYear.indexOf(2005);

  selectedWealthEstimatesByRegion.addEventListener("selectedChange", () => {
    wealthEstimatesByRegionChart.style.display = "block";
    wealthEstimatesByRegionInfo.style.display = "block";
    if (
      selectedWealthEstimatesByRegion.innerText === "Select" ||
      !selectedWealthEstimatesByRegion.innerText
    ) {
      wealthEstimatesByRegionChart.style.display = "none";
      wealthEstimatesByRegionInfo.style.display = "none";
      return;
    }

    let indicator;
    switch (selectedWealthEstimatesByRegion.innerText) {
      case "Adults":
        indicator = "Adults";
        break;
      case "Share of adults":
        indicator = "shareOfAdults";
        break;
      case "Total wealth":
        indicator = "totalWealth";
        break;
      case "Share of wealth":
        indicator = "shareOfWealth";
        break;
      case "Wealth per adult":
        indicator = "wealthPerAdult";
        break;
      case "Financial wealth":
        indicator = "financialWealth";
        break;
      case "Non-financial wealth":
        indicator = "nonFinancialWealth";
        break;
      case "Debt per adult":
        indicator = "debtPerAdult";
        break;
      case "Median wealth per adult":
        indicator = "medianWealthPerAdult";
        break;
      default:
        break;
    }

    selectedWealthEstimateByRegionLbl =
      selectedWealthEstimatesByRegion.innerText;

    addSlider(nameOfSingleSlider);
    let wealthEstimatesByRegionSingleSlider = document.getElementById(
      `year-slider-${nameOfSingleSlider}`
    );
    let wealthEstimateSliderOne = 0;
    let wealthEstimateSliderTwo =
      wealthEstimatesByRegion[yearIdx].Market.length - 1;
    let wealthEstimatesByRegionSliderRangeData = (wealthEstimatesbyRegionData =
      sortByIndex(
        wealthEstimatesByRegion[yearIdx].Market.slice(
          0,
          wealthEstimatesByRegion[yearIdx].Market.length - 1
        ),
        wealthEstimatesByRegion[yearIdx][indicator].slice(
          0,
          wealthEstimatesByRegion[yearIdx][indicator].length - 1
        )
      ));

    wealthEstimatesbyRegionData = sortByIndex(
      wealthEstimatesByRegion[yearIdx].Market.slice(
        wealthEstimateSliderOne,
        wealthEstimateSliderTwo
      ),
      wealthEstimatesByRegion[yearIdx][indicator].slice(
        wealthEstimateSliderOne,
        wealthEstimateSliderTwo
      )
    );

    for (i = 0; i < wealthEstimatesbyRegionData.sortedProperty.length; i++) {
      wealthEstimatesByRegionDoubleSliderData.x.push(i);
    }

    let sliderOne = document.getElementById(`slider-1-${nameOfDoubleSlider}`);
    let displayValOne = document.getElementById(
      `range-1-${nameOfDoubleSlider}`
    );
    let sliderTwo = document.getElementById(`slider-2-${nameOfDoubleSlider}`);
    let displayValTwo = document.getElementById(
      `range-2-${nameOfDoubleSlider}`
    );
    let lbIdxRegion = wealthEstimatesbyRegionMenu.indexOf(
      selectedWealthEstimateByRegionLbl
    );
    displayValOne.textContent = `Top: ${wealthEstimatesbyRegionData.sortedProperty[wealthEstimateSliderOne]}`;
    displayValTwo.textContent = `Bottom: ${
      wealthEstimatesbyRegionData.sortedProperty[wealthEstimateSliderTwo - 1]
    } ${wealthEstimatesUnits[lbIdxRegion]}`;

    wealthEstimatesByRegionDoubleSliderData.y =
      wealthEstimatesbyRegionData.sortedProperty;
    // this will revert the order of the data ??
    let unit = wealthEstimatesUnits[lbIdxRegion];
    wealthEstimatesByRegionInfo.innerHTML = `<summary>Wealth estimates by region information</summary><div>${
      selectedWealthEstimatesByRegion.innerText
    }</div><div>Range: ${range(
      wealthEstimatesbyRegionData.sortedProperty
    )} ${unit}</div><div>Max: ${max(
      wealthEstimatesbyRegionData.sortedProperty
    )} ${unit}</div><div>Min: ${min(
      wealthEstimatesbyRegionData.sortedProperty
    )} ${unit}</div><div>Mean: ${roundTo(
      mean(wealthEstimatesbyRegionData.sortedProperty),
      3
    )} ${unit}</div><div>Median: ${roundTo(
      median(wealthEstimatesbyRegionData.sortedProperty),
      3
    )} ${unit}</div><div>Std. Dev.: ${roundTo(
      standardDeviation(wealthEstimatesbyRegionData.sortedProperty),
      3
    )} ${unit}</div><div>Variance: ${roundTo(
      variance(wealthEstimatesbyRegionData.sortedProperty),
      3
    )} [${unit}]<sup>2</sup></div>`;

    let labels = wealthEstimatesbyRegionData.sortedMarket;
    // console.log(labels);
    wealthEstimatesByRegionBarChart.data.labels = labels;
    //  revert the order of the data back to original ??
    wealthEstimatesByRegionBarChart.data.datasets[0].data =
      wealthEstimatesbyRegionData.sortedProperty.toReversed();
    wealthEstimatesByRegionBarChart.options.plugins.title.text =
      selectedWealthEstimatesByRegion.innerText;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      wealthEstimatesByRegionBarChart.options.plugins.tooltip.titleFont.size = 14;
      wealthEstimatesByRegionBarChart.options.plugins.tooltip.bodyFont.size = 16;
      wealthEstimatesByRegionBarChart.options.aspectRatio = 1;
      wealthEstimatesByRegionBarChart.data.datasets[0].borderWidth = 1;
    }

    wealthEstimatesByRegionBarChart.update();

    addDoubleSlider(
      wealthEstimatesByRegionDoubleSliderData,
      wealthEstimatesByRegionSliderRangeData.sortedProperty,
      nameOfDoubleSlider,
      false,
      (sliderOneValue, sliderTwoValue) => {
        // console.log(sliderOneValue, sliderTwoValue);
        wealthEstimateSliderOne = Number(sliderOneValue);
        wealthEstimateSliderTwo = Number(sliderTwoValue) + 1;
        wealthEstimatesbyRegionData = sortByIndex(
          wealthEstimatesByRegion[yearIdx].Market.slice(
            0,
            wealthEstimatesByRegion[yearIdx].Market.length - 1
          ),
          wealthEstimatesByRegion[yearIdx][indicator].slice(
            0,
            wealthEstimatesByRegion[yearIdx].Market.length - 1
          )
        );

        displayValOne.textContent = `Top: ${
          wealthEstimatesByRegionSliderRangeData.sortedProperty[sliderOne.value]
        }`;

        displayValTwo.textContent = `Bottom: ${
          wealthEstimatesByRegionSliderRangeData.sortedProperty[sliderTwo.value]
        } ${wealthEstimatesUnits[lbIdxRegion]}`;

        wealthEstimatesByRegionInfo.innerHTML = `<summary>Wealth estimates by region information</summary><div>${
          selectedWealthEstimatesByRegion.innerText
        }</div><div>Range: ${roundTo(
          range(
            wealthEstimatesbyRegionData.sortedProperty.slice(
              wealthEstimateSliderOne,
              wealthEstimateSliderTwo
            )
          ),
          3
        )} ${unit}</div><div>Max: ${max(
          wealthEstimatesbyRegionData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        )} ${unit}</div><div>Min: ${min(
          wealthEstimatesbyRegionData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        )} ${unit}</div><div>Mean: ${roundTo(
          mean(
            wealthEstimatesbyRegionData.sortedProperty.slice(
              wealthEstimateSliderOne,
              wealthEstimateSliderTwo
            )
          ),
          3
        )} ${unit}</div><div>Median: ${roundTo(
          median(
            wealthEstimatesbyRegionData.sortedProperty.slice(
              wealthEstimateSliderOne,
              wealthEstimateSliderTwo
            )
          ),
          3
        )} ${unit}</div><div>Std. Dev.: ${roundTo(
          standardDeviation(
            wealthEstimatesbyRegionData.sortedProperty.slice(
              wealthEstimateSliderOne,
              wealthEstimateSliderTwo
            )
          ),
          3
        )} ${unit}</div><div>Variance: ${roundTo(
          variance(
            wealthEstimatesbyRegionData.sortedProperty.slice(
              wealthEstimateSliderOne,
              wealthEstimateSliderTwo
            )
          ),
          3
        )} [${unit}]<sup>2</sup></div>`;

        wealthEstimatesByRegionDoubleSliderData.y =
          wealthEstimatesbyRegionData.sortedProperty;
        let labels = wealthEstimatesbyRegionData.sortedMarket;
        wealthEstimatesByRegionBarChart.data.labels = labels.slice(
          wealthEstimateSliderOne,
          wealthEstimateSliderTwo
        );
        wealthEstimatesByRegionBarChart.data.datasets[0].data =
          wealthEstimatesbyRegionData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          );
        wealthEstimatesByRegionBarChart.update();
      }
    );

    addSlider(nameOfSingleSlider, (sliderValue) => {
      yearIdx = wealthEstimatesYear.indexOf(Number(sliderValue));
      wealthEstimatesbyRegionData = sortByIndex(
        wealthEstimatesByRegion[yearIdx].Market.slice(
          wealthEstimateSliderOne,
          wealthEstimateSliderTwo
        ),
        wealthEstimatesByRegion[yearIdx][indicator].slice(
          wealthEstimateSliderOne,
          wealthEstimateSliderTwo
        )
      );

      wealthEstimatesByRegionSliderRangeData = wealthEstimatesbyRegionData =
        sortByIndex(
          wealthEstimatesByRegion[yearIdx].Market.slice(
            0,
            wealthEstimatesByRegion[yearIdx].Market.length - 1
          ),
          wealthEstimatesByRegion[yearIdx][indicator].slice(
            0,
            wealthEstimatesByRegion[yearIdx][indicator].length - 1
          )
        );

      displayValOne.textContent = `Top: ${
        wealthEstimatesByRegionSliderRangeData.sortedProperty[sliderOne.value]
      }`;
      displayValTwo.textContent = `Bottom: ${
        wealthEstimatesByRegionSliderRangeData.sortedProperty[sliderTwo.value]
      } ${wealthEstimatesUnits[lbIdxRegion]}`;

      wealthEstimatesByRegionInfo.innerHTML = `<summary>Wealth estimates by region information</summary><div>${
        selectedWealthEstimatesByRegion.innerText
      }</div><div>Range: ${roundTo(
        range(
          wealthEstimatesbyRegionData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        ),
        3
      )} ${unit}</div><div>Max: ${max(
        wealthEstimatesbyRegionData.sortedProperty.slice(
          wealthEstimateSliderOne,
          wealthEstimateSliderTwo
        )
      )} ${unit}</div><div>Min: ${min(
        wealthEstimatesbyRegionData.sortedProperty.slice(
          wealthEstimateSliderOne,
          wealthEstimateSliderTwo
        )
      )} ${unit}</div><div>Mean: ${roundTo(
        mean(
          wealthEstimatesbyRegionData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        ),
        3
      )} ${unit}</div><div>Median: ${roundTo(
        median(
          wealthEstimatesbyRegionData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        ),
        3
      )} ${unit}</div><div>Std. Dev.: ${roundTo(
        standardDeviation(
          wealthEstimatesbyRegionData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        ),
        3
      )} ${unit}</div><div>Variance: ${roundTo(
        variance(
          wealthEstimatesbyRegionData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        ),
        3
      )} [${unit}]<sup>2</sup></div>`;

      wealthEstimatesByRegionDoubleSliderData.y =
        wealthEstimatesbyRegionData.sortedProperty;
      let labels = wealthEstimatesbyRegionData.sortedMarket;
      wealthEstimatesByRegionBarChart.data.labels = labels.slice(
        wealthEstimateSliderOne,
        wealthEstimateSliderTwo
      );
      wealthEstimatesByRegionBarChart.data.datasets[0].data =
        wealthEstimatesbyRegionData.sortedProperty.slice(
          wealthEstimateSliderOne,
          wealthEstimateSliderTwo
        );
      wealthEstimatesByRegionBarChart.update();
    });

    doubleSliderContainer.style.display = "block";
    singleSliderContainer.style.display = "block";
  });
}

let wealthEstimatesByRegionBarChart = new Chart(
  "wealth-estimates-by-region-chart",
  {
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
          borderWidth: 5,
          borderRadius: 30,
          borderSkipped: false,
          barPercentage: 0.5,
          stack: "stack 0",
          yAxisID: "y",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Wealth estimates by region",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let lbIdxRegion = wealthEstimatesbyRegionMenu.indexOf(
                selectedWealthEstimateByRegionLbl
              );
              let lblArray = [];
              lblArray.push(`${selectedWealthEstimateByRegionLbl}`);
              lblArray.push(
                `${context.parsed.y} ${wealthEstimatesUnits[lbIdxRegion]}`
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
