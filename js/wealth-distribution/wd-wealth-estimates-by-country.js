let nameOfDoubleSliderCountry = "wealth-estimates-by-country-double";
let nameOfSingleSliderCountry = "wealth-estimates-by-country-single";
let sectionSeven = document.getElementById("section-7");
sectionSeven.innerHTML += `<p class="txt-column">
   Wealth estimates by country from 2000 to 2022. Total wealth, share of wealth, wealth per adult, financial wealth per adult, non-financial wealth per adult, debt per adult and median wealth per adult are covered.
  </p>
  <div id="wealth-estimates-by-country" class="dropdown">
    <div id="select-wealth-estimates-by-country" class="select">
      <span id="selected-wealth-estimates-by-country" class="selected">Select</span>
      <div class="caret"></div>
    </div>
    <ul class="menu"></ul>
   </div>
   <div id="wealth-estimates-by-country-statistic" class="dropdown">
    <div id="select-wealth-estimates-by-country-statistic" class="select">
      <span id="selected-wealth-estimates-by-country-statistic" class="selected">Select</span>
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
  <div class="slider-single slider-single-container" id="${nameOfSingleSliderCountry}">
        <div class="slider-single slider-values">
          <div class="slider-single slider-values-container">
            <span class="slider-single" id="year-range-${nameOfSingleSliderCountry}"> </span>
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
            id="year-slider-${nameOfSingleSliderCountry}"
          />
      </div>
    </div>
    </div>
    <canvas id="wealth-estimates-by-country-chart"></canvas><details id="wealth-estimates-by-country-info"><summary id="wealth-estimates-by-country">Wealth estimates by country</summary></details>`;

let wealtEstimatesByCountryDropdownStatistic = document.getElementById(
  "wealth-estimates-by-country-statistic"
);
wealtEstimatesByCountryDropdownStatistic.style.display = "none";
let doubleSliderContainerCountry = document.getElementById(
  nameOfDoubleSliderCountry
);
doubleSliderContainerCountry.style.display = "none";
let singleSliderContainerCountry = document.getElementById(
  nameOfSingleSliderCountry
);
singleSliderContainerCountry.style.display = "none";
let wealthEstimatesByCountryChart = document.getElementById(
  "wealth-estimates-by-country-chart"
);
wealthEstimatesByCountryChart.style.display = "none";
let wealthEstimatesByCountryInfo = document.getElementById(
  "wealth-estimates-by-country-info"
);
wealthEstimatesByCountryInfo.style.display = "none";
let wealthEstimatesbyCountryMenu = [
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
let wealthEstimatesbyCountryData = [];
let wealthEstimatesByCountryDoubleSliderData = { x: [], y: [] };
let selectedWealthEstimateByCountryLbl;

function init_wealth_estimates_by_country() {
  addDropDown(
    wealthEstimatesbyCountryMenu,
    "wealth-estimates-by-country",
    "section-7",
    "selected-wealth-estimates-by-country",
    "select-wealth-estimates-by-country"
  );

  let selectedWealthEstimatesByCountry = document.getElementById(
    "selected-wealth-estimates-by-country"
  );

  setTimeout(() => {
    triggerChangeEvent(selectedWealthEstimatesByCountry);
  }, 100);

  let yearIdx = wealthEstimatesYear.indexOf(2005);

  selectedWealthEstimatesByCountry.addEventListener("selectedChange", () => {
    wealthEstimatesByCountryChart.style.display = "block";
    wealthEstimatesByCountryInfo.style.display = "block";
    if (
      selectedWealthEstimatesByCountry.innerText === "Select" ||
      !selectedWealthEstimatesByCountry.innerText
    ) {
      wealthEstimatesByCountryChart.style.display = "none";
      wealthEstimatesByCountryInfo.style.display = "none";
      return;
    }

    let indicator;
    switch (selectedWealthEstimatesByCountry.innerText) {
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

    selectedWealthEstimateByCountryLbl =
      selectedWealthEstimatesByCountry.innerText;

    addSlider(nameOfSingleSliderCountry);
    let wealthEstimatesByCountrySingleSlider = document.getElementById(
      `year-slider-${nameOfSingleSliderCountry}`
    );
    let wealthEstimateSliderOne = 0;
    let wealthEstimateSliderTwo = countries.length - 1;

    let wealthEstimatesByCountrySliderRangeData =
      (wealthEstimatesbyCountryData = sortByIndex(
        countries.slice(0, countries.length - 1),
        wealthEstimatesByCountry[yearIdx][indicator].slice(
          0,
          wealthEstimatesByCountry[yearIdx][indicator].length - 1
        )
      ));

    wealthEstimatesbyCountryData = sortByIndex(
      countries.slice(wealthEstimateSliderOne, wealthEstimateSliderTwo),
      wealthEstimatesByCountry[yearIdx][indicator].slice(
        wealthEstimateSliderOne,
        wealthEstimateSliderTwo
      )
    );

    for (i = 0; i < wealthEstimatesbyCountryData.sortedProperty.length; i++) {
      wealthEstimatesByCountryDoubleSliderData.x.push(i);
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
    let lbIdxCountry = wealthEstimatesbyCountryMenu.indexOf(
      selectedWealthEstimateByCountryLbl
    );

    displayValOne.textContent = `Top: ${wealthEstimatesbyCountryData.sortedProperty[wealthEstimateSliderOne]}`;
    displayValTwo.textContent = `Bottom: ${
      wealthEstimatesbyCountryData.sortedProperty[wealthEstimateSliderTwo - 1]
    } ${wealthEstimatesUnits[lbIdxCountry]}`;

    // note: reverse?
    let unit = wealthEstimatesUnits[lbIdxCountry];
    wealthEstimatesByCountryInfo.innerHTML = `<summary>Wealth estimates by country information</summary><div>${
      selectedWealthEstimatesByCountry.innerText
    }</div><div>Range: ${range(
      wealthEstimatesbyCountryData.sortedProperty
    )} ${unit}</div><div>Max: ${max(
      wealthEstimatesbyCountryData.sortedProperty
    )} ${unit}</div><div>Min: ${min(
      wealthEstimatesbyCountryData.sortedProperty
    )} ${unit}</div><div>Mean: ${roundTo(
      mean(wealthEstimatesbyCountryData.sortedProperty),
      3
    )} ${unit}</div><div>Median: ${roundTo(
      median(wealthEstimatesbyCountryData.sortedProperty),
      3
    )} ${unit}</div><div>Std. Dev.: ${roundTo(
      standardDeviation(wealthEstimatesbyCountryData.sortedProperty),
      3
    )} ${unit}</div><div>Variance: ${roundTo(
      variance(wealthEstimatesbyCountryData.sortedProperty),
      3
    )} [${unit}]<sup>2</sup></div>`;

    wealthEstimatesByCountryDoubleSliderData.y =
      wealthEstimatesbyCountryData.sortedProperty;
    let labels = wealthEstimatesbyCountryData.sortedMarket;
    wealthEstimatesByCountryBarChart.data.labels = labels;
    // revert the data to the original order
    wealthEstimatesByCountryBarChart.data.datasets[0].data =
      wealthEstimatesbyCountryData.sortedProperty.toReversed();
    wealthEstimatesByCountryBarChart.options.plugins.title.text =
      selectedWealthEstimatesByCountry.innerText;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      wealthEstimatesByCountryBarChart.options.aspectRatio = 1;
      wealthEstimatesByCountryBarChart.options.plugins.tooltip.titleFont.size = 14;
      wealthEstimatesByCountryBarChart.options.plugins.tooltip.bodyFont.size = 16;
      wealthEstimatesByCountryBarChart.data.datasets[0].borderWidth = 1;
    }

    wealthEstimatesByCountryBarChart.update();

    addDoubleSlider(
      wealthEstimatesByCountryDoubleSliderData,
      wealthEstimatesByCountrySliderRangeData.sortedProperty,
      nameOfDoubleSliderCountry,
      false,
      (sliderOneValue, sliderTwoValue) => {
        // console.log(sliderOneValue, sliderTwoValue);
        wealthEstimateSliderOne = Number(sliderOneValue);
        wealthEstimateSliderTwo = Number(sliderTwoValue) + 1;
        wealthEstimatesbyCountryData = sortByIndex(
          countries.slice(0, countries.length - 1),
          wealthEstimatesByCountry[yearIdx][indicator].slice(
            0,
            countries.length - 1
          )
        );
        displayValOne.textContent = `Top: ${
          wealthEstimatesByCountrySliderRangeData.sortedProperty[
            sliderOne.value
          ]
        }`;

        displayValTwo.textContent = `Bottom: ${
          wealthEstimatesByCountrySliderRangeData.sortedProperty[
            sliderTwo.value
          ]
        } ${wealthEstimatesUnits[lbIdxCountry]}`;

        wealthEstimatesByCountryInfo.innerHTML = `<summary>Wealth estimates by country information</summary><div>${
          selectedWealthEstimatesByCountry.innerText
        }</div><div>Range: ${range(
          wealthEstimatesbyCountryData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        )} ${unit}</div><div>Max: ${max(
          wealthEstimatesbyCountryData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        )} ${unit}</div><div>Min: ${min(
          wealthEstimatesbyCountryData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        )} ${unit}</div><div>Mean: ${roundTo(
          mean(
            wealthEstimatesbyCountryData.sortedProperty.slice(
              wealthEstimateSliderOne,
              wealthEstimateSliderTwo
            )
          ),
          3
        )} ${unit}</div><div>Median: ${roundTo(
          median(
            wealthEstimatesbyCountryData.sortedProperty.slice(
              wealthEstimateSliderOne,
              wealthEstimateSliderTwo
            )
          ),
          3
        )} ${unit}</div><div>Std. Dev.: ${roundTo(
          standardDeviation(
            wealthEstimatesbyCountryData.sortedProperty.slice(
              wealthEstimateSliderOne,
              wealthEstimateSliderTwo
            )
          ),
          3
        )} ${unit}</div><div>Variance: ${roundTo(
          variance(
            wealthEstimatesbyCountryData.sortedProperty.slice(
              wealthEstimateSliderOne,
              wealthEstimateSliderTwo
            )
          ),
          3
        )} [${unit}]<sup>2</sup></div>`;

        wealthEstimatesByCountryDoubleSliderData.y =
          wealthEstimatesbyCountryData.sortedProperty;

        let labels = wealthEstimatesbyCountryData.sortedMarket;
        wealthEstimatesByCountryBarChart.data.labels = labels.slice(
          wealthEstimateSliderOne,
          wealthEstimateSliderTwo
        );
        wealthEstimatesByCountryBarChart.data.datasets[0].data =
          wealthEstimatesbyCountryData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          );
        wealthEstimatesByCountryBarChart.update();
      }
    );

    addSlider(nameOfSingleSliderCountry, (sliderValue) => {
      yearIdx = wealthEstimatesYear.indexOf(Number(sliderValue));

      wealthEstimatesbyCountryData = sortByIndex(
        countries.slice(wealthEstimateSliderOne, wealthEstimateSliderTwo),
        wealthEstimatesByCountry[yearIdx][indicator].slice(
          wealthEstimateSliderOne,
          wealthEstimateSliderTwo
        )
      );
      wealthEstimatesByCountrySliderRangeData = wealthEstimatesbyCountryData =
        sortByIndex(
          countries.slice(0, countries.length - 1),
          wealthEstimatesByCountry[yearIdx][indicator].slice(
            0,
            wealthEstimatesByCountry[yearIdx][indicator].length - 1
          )
        );
      displayValOne.textContent = `Top: ${
        wealthEstimatesByCountrySliderRangeData.sortedProperty[sliderOne.value]
      }`;
      displayValTwo.textContent = `Bottom: ${
        wealthEstimatesByCountrySliderRangeData.sortedProperty[sliderTwo.value]
      } ${wealthEstimatesUnits[lbIdxCountry]}`;

      wealthEstimatesByCountryInfo.innerHTML = `<summary>Wealth estimates by country information</summary><div>${
        selectedWealthEstimatesByCountry.innerText
      }</div><div>Range: ${range(
        wealthEstimatesbyCountryData.sortedProperty.slice(
          wealthEstimateSliderOne,
          wealthEstimateSliderTwo
        )
      )} ${unit}</div><div>Max: ${max(
        wealthEstimatesbyCountryData.sortedProperty.slice(
          wealthEstimateSliderOne,
          wealthEstimateSliderTwo
        )
      )} ${unit}</div><div>Min: ${min(
        wealthEstimatesbyCountryData.sortedProperty.slice(
          wealthEstimateSliderOne,
          wealthEstimateSliderTwo
        )
      )} ${unit}</div><div>Mean: ${roundTo(
        mean(
          wealthEstimatesbyCountryData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        ),
        3
      )} ${unit}</div><div>Median: ${roundTo(
        median(
          wealthEstimatesbyCountryData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        ),
        3
      )} ${unit}</div><div>Std. Dev.: ${roundTo(
        standardDeviation(
          wealthEstimatesbyCountryData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        ),
        3
      )} ${unit}</div><div>Variance: ${roundTo(
        variance(
          wealthEstimatesbyCountryData.sortedProperty.slice(
            wealthEstimateSliderOne,
            wealthEstimateSliderTwo
          )
        ),
        3
      )} [${unit}]<sup>2</sup></div>`;

      wealthEstimatesByCountryDoubleSliderData.y =
        wealthEstimatesbyCountryData.sortedProperty;
      let labels = wealthEstimatesbyCountryData.sortedMarket.slice(
        wealthEstimateSliderOne,
        wealthEstimateSliderTwo
      );

      wealthEstimatesByCountryBarChart.data.labels = labels;
      wealthEstimatesByCountryBarChart.data.datasets[0].data =
        wealthEstimatesbyCountryData.sortedProperty.slice(
          wealthEstimateSliderOne,
          wealthEstimateSliderTwo
        );
      wealthEstimatesByCountryBarChart.update();
    });

    doubleSliderContainerCountry.style.display = "block";
    singleSliderContainerCountry.style.display = "block";
  });
}

let wealthEstimatesByCountryBarChart = new Chart(
  "wealth-estimates-by-country-chart",
  {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "rgba(233, 236, 239, 0.3)",
          hoverBackgroundColor: colorsHEX.onyx,
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
          text: "Wealth estimates by country",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let lbIdxCountry = wealthEstimatesbyCountryMenu.indexOf(
                selectedWealthEstimateByCountryLbl
              );
              let lblArray = [];
              lblArray.push(`${selectedWealthEstimateByCountryLbl}`);
              lblArray.push(
                `${context.parsed.y} ${wealthEstimatesUnits[lbIdxCountry]}`
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
