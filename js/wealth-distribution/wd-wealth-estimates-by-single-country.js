let nameOfDoubleSliderSingleCountry =
  "wealth-estimates-by-single-country-double";
let sectionEight = document.getElementById("section-8");
sectionEight.innerHTML += `<p class="txt-column">
   A dashboard of wealth estimates by single country from 2000 to 2022. Total wealth, share of wealth, wealth per adult, financial wealth per adult, non-financial wealth per adult, debt per adult and median wealth per adult are covered. Some descriptive statistics are provided for each wealth estimate.
  </p>
  <div id="wealth-estimates-by-single-country" class="dropdown">
    <div id="select-wealth-estimates-by-single-country" class="select">
      <span id="selected-wealth-estimates-by-single-country" class="selected">Select</span>
      <div class="caret"></div>
    </div>
    <ul class="menu"></ul>
   </div>

   <div class="slider-double" id="${nameOfDoubleSliderSingleCountry}"><div class="slider-double slider-values">
      <div class="slider-double slider-values-container">
        <span class="slider-double" id="range-1-${nameOfDoubleSliderSingleCountry}"> </span>
        <span class="slider-double"> &dash; </span>
        <span class="slider-double" id="range-2-${nameOfDoubleSliderSingleCountry}"> </span>
      </div>
    </div>

    <div class="slider-double wrapper">
      <div class="slider-double slider-legend-container">
        <div class="slider-double slider-track-${nameOfDoubleSliderSingleCountry}"></div>
        <input class="slider-double" type="range" min="1" max="7" value="2" id="slider-1-${nameOfDoubleSliderSingleCountry}" />
        <input class="slider-double" type="range" min="1" max="7" value="5" id="slider-2-${nameOfDoubleSliderSingleCountry}" />
      </div>
    </div>
  </div>
 
<canvas id="wealth-estimates-by-single-country-total-wealth-chart"></canvas>
<details id="total-wealth-info"><summary id="total-wealth-summary">Info</summary></details>
<canvas id="wealth-estimates-by-single-country-wealth-per-adult-chart"></canvas>
<details id="wealth-per-adult-info"><summary id="wealth-per-adult-summary">Info</summary></details>
<canvas id="wealth-estimates-by-single-country-median-wealth-chart"></canvas>
<details id="median-wealth-info"><summary id="median-wealth-summary">Info</summary></details>
<canvas id="wealth-estimates-by-single-country-wealth-components-chart"></canvas>
<details id="wealth-components-info"><summary id="wealth-components-summary">Info</summary></details>
<canvas id="wealth-estimates-by-single-country-share-of-wealth-chart"></canvas>
<details id="share-of-wealth-info"><summary id="share-of-wealth-summary">Info</summary></details>`;

let totalWealthInfo = document.getElementById("total-wealth-info");
totalWealthInfo.style.display = "none";
let wealthPerAdultInfo = document.getElementById("wealth-per-adult-info");
wealthPerAdultInfo.style.display = "none";
let medianWealthInfo = document.getElementById("median-wealth-info");
medianWealthInfo.style.display = "none";
let wealthComponentsInfo = document.getElementById("wealth-components-info");
wealthComponentsInfo.style.display = "none";
let shareOfWealthInfo = document.getElementById("share-of-wealth-info");
shareOfWealthInfo.style.display = "none";

let doubleSliderContainerSingleCountry = document.getElementById(
  nameOfDoubleSliderSingleCountry
);
doubleSliderContainerSingleCountry.style.display = "none";
let wealthEstimatesBySingleCountryTotalWealthChart = document.getElementById(
  "wealth-estimates-by-single-country-total-wealth-chart"
);
wealthEstimatesBySingleCountryTotalWealthChart.style.display = "none";
let wealthEstimatesBySingleCountryWealthPerAdultChart = document.getElementById(
  "wealth-estimates-by-single-country-wealth-per-adult-chart"
);
wealthEstimatesBySingleCountryWealthPerAdultChart.style.display = "none";
let wealthEstimatesBySingleCountryMedianWealthChart = document.getElementById(
  "wealth-estimates-by-single-country-median-wealth-chart"
);
wealthEstimatesBySingleCountryMedianWealthChart.style.display = "none";
let wealthEstimatesBySingleCountryWealthComponentsChart =
  document.getElementById(
    "wealth-estimates-by-single-country-wealth-components-chart"
  );
wealthEstimatesBySingleCountryWealthComponentsChart.style.display = "none";
let wealthEstimatesBySingleCountryShareOfWealthChart = document.getElementById(
  "wealth-estimates-by-single-country-share-of-wealth-chart"
);
wealthEstimatesBySingleCountryShareOfWealthChart.style.display = "none";

let wealthEstimatesbySingleCountryData = {
  totalWealth: [],
  shareOfWealth: [],
  wealthPerAdult: [],
  financialWealth: [],
  nonFinancialWealth: [],
  debtPerAdult: [],
  medianWealthPerAdult: [],
};

let wealthEstimatesBySingleCountryDoubleSliderData = { x: [], y: [] };

let allYears = [
  2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
];

let selectedWealthEstimateBySingleCountryLbl;

function init_wealth_estimates_by_single_country() {
  addDropDown(
    countries,
    "wealth-estimates-by-single-country",
    "section-8",
    "selected-wealth-estimates-by-single-country",
    "select-wealth-estimates-by-single-country"
  );

  let selectedWealthEstimatesBySingleCountry = document.getElementById(
    "selected-wealth-estimates-by-single-country"
  );

  setTimeout(() => {
    triggerChangeEvent(selectedWealthEstimatesBySingleCountry);
  }, 100);

  let yearIdx = wealthEstimatesYear.indexOf(2005);

  selectedWealthEstimatesBySingleCountry.addEventListener(
    "selectedChange",
    () => {
      wealthEstimatesBySingleCountryTotalWealthChart.style.display = "block";
      totalWealthInfo.style.display = "block";
      wealthEstimatesBySingleCountryWealthPerAdultChart.style.display = "block";
      wealthPerAdultInfo.style.display = "block";
      wealthEstimatesBySingleCountryMedianWealthChart.style.display = "block";
      medianWealthInfo.style.display = "block";
      wealthEstimatesBySingleCountryWealthComponentsChart.style.display =
        "block";
      wealthComponentsInfo.style.display = "block";
      wealthEstimatesBySingleCountryShareOfWealthChart.style.display = "block";
      shareOfWealthInfo.style.display = "block";
      if (selectedWealthEstimatesBySingleCountry.innerText === "Select") {
        wealthEstimatesBySingleCountryTotalWealthChart.style.display = "none";
        totalWealthInfo.style.display = "none";
        wealthEstimatesBySingleCountryWealthPerAdultChart.style.display =
          "none";
        wealthPerAdultInfo.style.display = "none";
        wealthEstimatesBySingleCountryMedianWealthChart.style.display = "none";
        medianWealthInfo.style.display = "none";
        wealthEstimatesBySingleCountryWealthComponentsChart.style.display =
          "none";
        wealthComponentsInfo.style.display = "none";
        wealthEstimatesBySingleCountryShareOfWealthChart.style.display = "none";
        shareOfWealthInfo.style.display = "none";
        return;
      }

      selectedWealthEstimateByRegionLbl =
        selectedWealthEstimatesBySingleCountry.innerText;
      let yearOne = 0;
      let yearTwo = allYears.length - 1;

      for (i = 0; i < allYears.length; i++) {
        wealthEstimatesBySingleCountryDoubleSliderData.x.push(i);
      }
      wealthEstimatesBySingleCountryDoubleSliderData.y = allYears;

      let wealthEstimatesBySingleCountrySliderRangeData = allYears;

      let sliderOne = document.getElementById(
        `slider-1-${nameOfDoubleSliderSingleCountry}`
      );
      let displayValOne = document.getElementById(
        `range-1-${nameOfDoubleSliderSingleCountry}`
      );
      let sliderTwo = document.getElementById(
        `slider-2-${nameOfDoubleSliderSingleCountry}`
      );
      let displayValTwo = document.getElementById(
        `range-2-${nameOfDoubleSliderSingleCountry}`
      );
      displayValOne.textContent = `Years: ${allYears[yearOne]}`;
      displayValTwo.textContent = `${allYears[yearTwo]} `;

      let labels = allYears;
      //   TOTAL WEALTH
      wealthEstimatesbySingleCountryData.totalWealth =
        getWealthEstimateArrayByCountry(
          getAnnualWealthEstimateDataByCountry(
            wealthEstimatesByCountry,
            selectedWealthEstimatesBySingleCountry.innerText
          ),
          "Total wealth"
        );
      //   WEALTH PER ADULT
      wealthEstimatesbySingleCountryData.wealthPerAdult =
        getWealthEstimateArrayByCountry(
          getAnnualWealthEstimateDataByCountry(
            wealthEstimatesByCountry,
            selectedWealthEstimatesBySingleCountry.innerText
          ),
          "Wealth per adult"
        );
      // MEDIAN WEALTH PER ADULT
      wealthEstimatesbySingleCountryData.medianWealthPerAdult =
        getWealthEstimateArrayByCountry(
          getAnnualWealthEstimateDataByCountry(
            wealthEstimatesByCountry,
            selectedWealthEstimatesBySingleCountry.innerText
          ),
          "Median wealth per adult"
        );
      // COMPONENTS OF WEALTH
      wealthEstimatesbySingleCountryData.financialWealth =
        getWealthEstimateArrayByCountry(
          getAnnualWealthEstimateDataByCountry(
            wealthEstimatesByCountry,
            selectedWealthEstimatesBySingleCountry.innerText
          ),
          "Financial wealth"
        );
      wealthEstimatesbySingleCountryData.nonFinancialWealth =
        getWealthEstimateArrayByCountry(
          getAnnualWealthEstimateDataByCountry(
            wealthEstimatesByCountry,
            selectedWealthEstimatesBySingleCountry.innerText
          ),
          "Non-financial wealth"
        );
      wealthEstimatesbySingleCountryData.debtPerAdult =
        getWealthEstimateArrayByCountry(
          getAnnualWealthEstimateDataByCountry(
            wealthEstimatesByCountry,
            selectedWealthEstimatesBySingleCountry.innerText
          ),
          "Debt per adult"
        );
      // SHARE OF WEALTH
      wealthEstimatesbySingleCountryData.shareOfWealth =
        getWealthEstimateArrayByCountry(
          getAnnualWealthEstimateDataByCountry(
            wealthEstimatesByCountry,
            selectedWealthEstimatesBySingleCountry.innerText
          ),
          "Share of wealth"
        );
      // UPDATE DATA
      // TOTAL WEALTH
      wealthEstimatesBySingleCountryTotalWealthBarChart.data.labels = labels;
      wealthEstimatesBySingleCountryTotalWealthBarChart.data.datasets[0].data =
        wealthEstimatesbySingleCountryData.totalWealth;
      //   title
      wealthEstimatesBySingleCountryTotalWealthBarChart.options.plugins.title.text = `${selectedWealthEstimatesBySingleCountry.innerText} - Total wealth [USD Bn]`;
      //   update wealth info
      totalWealthInfo.innerHTML = `<summary>Total wealth information</summary><div>Years: ${
        allYears[yearOne]
      } to ${allYears[yearTwo]}</div><div>Range: ${range(
        wealthEstimatesbySingleCountryData.totalWealth
      )} USD Bn</div><div>Average change rate: ${naIfNaN(
        roundTo(
          mean(percentChange(wealthEstimatesbySingleCountryData.totalWealth)),
          3
        )
      )} %</div><div>Average change per year: ${roundTo(
        mean(difference(wealthEstimatesbySingleCountryData.totalWealth)),
        3
      )} USD Bn</div><div>Median change per year: ${roundTo(
        median(difference(wealthEstimatesbySingleCountryData.totalWealth)),
        3
      )} USD Bn</div>`;
      // WEALTH PER ADULT
      wealthEstimatesBySingleCountryWealthPerAdultBarChart.data.labels = labels;
      wealthEstimatesBySingleCountryWealthPerAdultBarChart.data.datasets[0].data =
        wealthEstimatesbySingleCountryData.wealthPerAdult;
      //   title
      wealthEstimatesBySingleCountryWealthPerAdultBarChart.options.plugins.title.text = `${selectedWealthEstimatesBySingleCountry.innerText} - Wealth per adult [USD]`;
      //   update wealth info
      wealthPerAdultInfo.innerHTML = `<summary>Wealth per adult information</summary><div>Years: ${
        allYears[yearOne]
      } to ${allYears[yearTwo]}</div><div>Range: ${range(
        wealthEstimatesbySingleCountryData.wealthPerAdult
      )} USD</div><div>Average change rate: ${naIfNaN(
        roundTo(
          mean(
            percentChange(wealthEstimatesbySingleCountryData.wealthPerAdult)
          ),
          3
        )
      )} %</div><div>Average change per year: ${roundTo(
        mean(difference(wealthEstimatesbySingleCountryData.wealthPerAdult)),
        3
      )} USD</div><div>Median change per year: ${roundTo(
        median(difference(wealthEstimatesbySingleCountryData.wealthPerAdult)),
        3
      )} USD</div>`;
      // MEDIAN WEALTH PER ADULT
      wealthEstimatesBySingleCountryMedianWealthBarChart.data.labels = labels;
      wealthEstimatesBySingleCountryMedianWealthBarChart.data.datasets[0].data =
        wealthEstimatesbySingleCountryData.medianWealthPerAdult;
      //   title
      wealthEstimatesBySingleCountryMedianWealthBarChart.options.plugins.title.text = `${selectedWealthEstimatesBySingleCountry.innerText} - Median wealth per adult [USD]`;
      //  update wealth info
      medianWealthInfo.innerHTML = `<summary>Median wealth per adult information</summary><div>Years: ${
        allYears[yearOne]
      } to ${allYears[yearTwo]}</div><div>Range: ${range(
        wealthEstimatesbySingleCountryData.medianWealthPerAdult
      )} USD</div><div>Average change rate: ${naIfNaN(
        roundTo(
          mean(
            percentChange(
              wealthEstimatesbySingleCountryData.medianWealthPerAdult
            )
          ),
          3
        )
      )} %</div><div>Average change per year: ${roundTo(
        mean(
          difference(wealthEstimatesbySingleCountryData.medianWealthPerAdult)
        ),
        3
      )} USD</div><div>Median change per year: ${roundTo(
        median(
          difference(wealthEstimatesbySingleCountryData.medianWealthPerAdult)
        ),
        3
      )} USD</div>`;
      //  COMPONENTS OF WEALTH
      wealthEstimatesBySingleCountryWealthComponentsBarChart.data.labels =
        labels;
      wealthEstimatesBySingleCountryWealthComponentsBarChart.data.datasets[0].data =
        wealthEstimatesbySingleCountryData.financialWealth;
      wealthEstimatesBySingleCountryWealthComponentsBarChart.data.datasets[1].data =
        wealthEstimatesbySingleCountryData.nonFinancialWealth;
      wealthEstimatesBySingleCountryWealthComponentsBarChart.data.datasets[2].data =
        wealthEstimatesbySingleCountryData.debtPerAdult;
      //   title
      wealthEstimatesBySingleCountryWealthComponentsBarChart.options.plugins.title.text = `${selectedWealthEstimatesBySingleCountry.innerText} - Components of wealth [USD]`;
      //   update wealth info
      wealthComponentsInfo.innerHTML = `<summary>Components of wealth information</summary><div>Financial wealth per adult:</div><div>Years: ${
        allYears[yearOne]
      } to ${allYears[yearTwo]}</div><div><pre>  Range: ${range(
        wealthEstimatesbySingleCountryData.financialWealth
      )} USD</pre></div><div><pre>  Average change rate: ${naIfNaN(
        roundTo(
          mean(
            percentChange(wealthEstimatesbySingleCountryData.financialWealth)
          ),
          3
        )
      )} %</pre></div><div><pre>  Average change per year: ${roundTo(
        mean(difference(wealthEstimatesbySingleCountryData.financialWealth)),
        3
      )} USD</pre></div><div><pre>  Median change per year: ${roundTo(
        median(difference(wealthEstimatesbySingleCountryData.financialWealth)),
        3
      )} USD</pre></div><div>Non-financial wealth per adult</div><div><pre>  Range: ${range(
        wealthEstimatesbySingleCountryData.nonFinancialWealth
      )} USD</pre></div><div><pre>  Average change rate: ${naIfNaN(
        roundTo(
          mean(
            percentChange(wealthEstimatesbySingleCountryData.nonFinancialWealth)
          ),
          3
        )
      )} %</pre></div><div><pre>  Average change per year: ${roundTo(
        mean(difference(wealthEstimatesbySingleCountryData.nonFinancialWealth)),
        3
      )} USD</pre></div><div><pre>  Median change per year: ${roundTo(
        median(
          difference(wealthEstimatesbySingleCountryData.nonFinancialWealth)
        ),
        3
      )} USD</pre></div><div>Debt per adult:</div><div><pre>  Range: ${range(
        wealthEstimatesbySingleCountryData.debtPerAdult
      )} USD</pre></div><div><pre>  Average change rate: ${naIfNaN(
        roundTo(
          mean(percentChange(wealthEstimatesbySingleCountryData.debtPerAdult)),
          3
        )
      )} %</pre></div><div><pre>  Average change per year: ${roundTo(
        mean(difference(wealthEstimatesbySingleCountryData.debtPerAdult)),
        3
      )} USD</pre></div><div><pre>  Median change per year: ${roundTo(
        median(difference(wealthEstimatesbySingleCountryData.debtPerAdult)),
        3
      )} USD</pre></div>`;
      // SHARE OF WEALTH
      wealthEstimatesBySingleCountryShareOfWealthBarChart.data.labels = labels;
      wealthEstimatesBySingleCountryShareOfWealthBarChart.data.datasets[0].data =
        wealthEstimatesbySingleCountryData.shareOfWealth;
      //   title
      wealthEstimatesBySingleCountryShareOfWealthBarChart.options.plugins.title.text = `${selectedWealthEstimatesBySingleCountry.innerText} - Share of wealth [%]`;
      //  update wealth info
      shareOfWealthInfo.innerHTML = `<summary>Share of wealth information</summary><div>Years: ${
        allYears[yearOne]
      } to ${allYears[yearTwo]}</div><div>Range: ${roundTo(
        range(wealthEstimatesbySingleCountryData.shareOfWealth),
        3
      )} % units</div><div>Average change rate: ${naIfNaN(
        roundTo(
          mean(percentChange(wealthEstimatesbySingleCountryData.shareOfWealth)),
          3
        )
      )} %</div><div>Average change per year: ${roundTo(
        mean(difference(wealthEstimatesbySingleCountryData.shareOfWealth)),
        3
      )} % units</div><div>Median change per year: ${roundTo(
        median(difference(wealthEstimatesbySingleCountryData.shareOfWealth)),
        3
      )} % units</div>`;
      //
      wealthEstimatesBySingleCountryTotalWealthBarChart.options.plugins.title.text =
        selectedWealthEstimatesBySingleCountry.innerText;

      // update charts
      if (detectMobile()) {
        Chart.defaults.font.size = 8;
        wealthEstimatesBySingleCountryTotalWealthBarChart.options.aspectRatio =
          1.5 / 1;
        wealthEstimatesBySingleCountryTotalWealthBarChart.options.plugins.tooltip.titleFont.size = 16;
        wealthEstimatesBySingleCountryTotalWealthBarChart.options.plugins.tooltip.bodyFont.size = 14;
        wealthEstimatesBySingleCountryTotalWealthBarChart.data.datasets[0].borderWidth = 1;
        wealthEstimatesBySingleCountryWealthPerAdultBarChart.options.aspectRatio =
          1.5 / 1;
        wealthEstimatesBySingleCountryWealthPerAdultBarChart.options.plugins.tooltip.titleFont.size = 16;
        wealthEstimatesBySingleCountryWealthPerAdultBarChart.options.plugins.tooltip.bodyFont.size = 14;
        wealthEstimatesBySingleCountryWealthPerAdultBarChart.data.datasets[0].borderWidth = 1;
        wealthEstimatesBySingleCountryMedianWealthBarChart.options.aspectRatio =
          1.5 / 1;
        wealthEstimatesBySingleCountryMedianWealthBarChart.options.plugins.tooltip.titleFont.size = 16;
        wealthEstimatesBySingleCountryMedianWealthBarChart.options.plugins.tooltip.bodyFont.size = 14;
        wealthEstimatesBySingleCountryMedianWealthBarChart.data.datasets[0].borderWidth = 1;
        wealthEstimatesBySingleCountryWealthComponentsBarChart.options.aspectRatio = 1;
        wealthEstimatesBySingleCountryWealthComponentsBarChart.options.plugins.tooltip.titleFont.size = 16;
        wealthEstimatesBySingleCountryWealthComponentsBarChart.options.plugins.tooltip.bodyFont.size = 14;
        wealthEstimatesBySingleCountryWealthComponentsBarChart.data.datasets[0].borderWidth = 1;
        wealthEstimatesBySingleCountryWealthComponentsBarChart.data.datasets[1].borderWidth = 1;
        wealthEstimatesBySingleCountryWealthComponentsBarChart.data.datasets[2].borderWidth = 1;
        wealthEstimatesBySingleCountryShareOfWealthBarChart.options.aspectRatio =
          1.5 / 1;
        wealthEstimatesBySingleCountryShareOfWealthBarChart.options.plugins.tooltip.titleFont.size = 16;
        wealthEstimatesBySingleCountryShareOfWealthBarChart.options.plugins.tooltip.bodyFont.size = 14;
      }

      wealthEstimatesBySingleCountryTotalWealthBarChart.update();
      wealthEstimatesBySingleCountryWealthPerAdultBarChart.update();
      wealthEstimatesBySingleCountryMedianWealthBarChart.update();
      wealthEstimatesBySingleCountryWealthComponentsBarChart.update();
      wealthEstimatesBySingleCountryShareOfWealthBarChart.update();

      addDoubleSlider(
        wealthEstimatesBySingleCountryDoubleSliderData,
        wealthEstimatesBySingleCountrySliderRangeData,
        nameOfDoubleSliderSingleCountry,
        true,
        (sliderOneValue, sliderTwoValue) => {
          yearOne = Number(sliderOneValue);
          yearTwo = Number(sliderTwoValue) + 1;
          //   LABELS
          let labels = allYears.slice(yearOne, yearTwo);
          //   TOTAL WEALTH
          wealthEstimatesbySingleCountryData.totalWealth =
            getWealthEstimateArrayByCountry(
              getAnnualWealthEstimateDataByCountry(
                wealthEstimatesByCountry,
                selectedWealthEstimatesBySingleCountry.innerText
              ),
              "Total wealth"
            ).slice(yearOne, yearTwo);
          //  WEALTH PER ADULT
          wealthEstimatesbySingleCountryData.wealthPerAdult =
            getWealthEstimateArrayByCountry(
              getAnnualWealthEstimateDataByCountry(
                wealthEstimatesByCountry,
                selectedWealthEstimatesBySingleCountry.innerText
              ),
              "Wealth per adult"
            ).slice(yearOne, yearTwo);
          // MEDIAN WEALTH PER ADULT
          wealthEstimatesbySingleCountryData.medianWealthPerAdult =
            getWealthEstimateArrayByCountry(
              getAnnualWealthEstimateDataByCountry(
                wealthEstimatesByCountry,
                selectedWealthEstimatesBySingleCountry.innerText
              ),
              "Median wealth per adult"
            ).slice(yearOne, yearTwo);
          // COMPONENTS OF WEALTH
          wealthEstimatesbySingleCountryData.financialWealth =
            getWealthEstimateArrayByCountry(
              getAnnualWealthEstimateDataByCountry(
                wealthEstimatesByCountry,
                selectedWealthEstimatesBySingleCountry.innerText
              ),
              "Financial wealth"
            ).slice(yearOne, yearTwo);
          wealthEstimatesbySingleCountryData.nonFinancialWealth =
            getWealthEstimateArrayByCountry(
              getAnnualWealthEstimateDataByCountry(
                wealthEstimatesByCountry,
                selectedWealthEstimatesBySingleCountry.innerText
              ),
              "Non-financial wealth"
            ).slice(yearOne, yearTwo);
          wealthEstimatesbySingleCountryData.debtPerAdult =
            getWealthEstimateArrayByCountry(
              getAnnualWealthEstimateDataByCountry(
                wealthEstimatesByCountry,
                selectedWealthEstimatesBySingleCountry.innerText
              ),
              "Debt per adult"
            ).slice(yearOne, yearTwo);
          // SHARE OF WEALTH
          wealthEstimatesbySingleCountryData.shareOfWealth =
            getWealthEstimateArrayByCountry(
              getAnnualWealthEstimateDataByCountry(
                wealthEstimatesByCountry,
                selectedWealthEstimatesBySingleCountry.innerText
              ),
              "Share of wealth"
            ).slice(yearOne, yearTwo);

          //  UPDATE DATA
          // TOTAL WEALTH
          wealthEstimatesBySingleCountryTotalWealthBarChart.data.labels =
            labels;
          wealthEstimatesBySingleCountryTotalWealthBarChart.data.datasets[0].data =
            wealthEstimatesbySingleCountryData.totalWealth;
          // update wealth info
          totalWealthInfo.innerHTML = `<summary>Total wealth information</summary><div>Years: ${
            allYears[yearOne]
          } to ${allYears[yearTwo - 1]}</div><div>Range: ${range(
            wealthEstimatesbySingleCountryData.totalWealth
          )} USD Bn</div><div>Average change rate: ${naIfNaN(
            roundTo(
              mean(
                percentChange(wealthEstimatesbySingleCountryData.totalWealth)
              ),
              3
            )
          )} %</div><div>Average change per year: ${naIfNaN(
            roundTo(
              mean(difference(wealthEstimatesbySingleCountryData.totalWealth)),
              3
            )
          )} USD Bn</div><div>Median change per year: ${naIfNaN(
            roundTo(
              median(
                difference(wealthEstimatesbySingleCountryData.totalWealth)
              ),
              3
            )
          )} USD Bn</div>`;
          //  WEALTH PER ADULT
          wealthEstimatesBySingleCountryWealthPerAdultBarChart.data.labels =
            labels;
          wealthEstimatesBySingleCountryWealthPerAdultBarChart.data.datasets[0].data =
            wealthEstimatesbySingleCountryData.wealthPerAdult;
          // update wealth info
          wealthPerAdultInfo.innerHTML = `<summary>Wealth per adult information</summary><div>Years: ${
            allYears[yearOne]
          } to ${allYears[yearTwo - 1]}</div><div>Range: ${range(
            wealthEstimatesbySingleCountryData.wealthPerAdult
          )} USD</div><div>Average change rate: ${naIfNaN(
            roundTo(
              mean(
                percentChange(wealthEstimatesbySingleCountryData.wealthPerAdult)
              ),
              3
            )
          )} %</div><div>Average change per year: ${naIfNaN(
            roundTo(
              mean(
                difference(wealthEstimatesbySingleCountryData.wealthPerAdult)
              ),
              3
            )
          )} USD</div><div>Median change per year: ${naIfNaN(
            roundTo(
              median(
                difference(wealthEstimatesbySingleCountryData.wealthPerAdult)
              ),
              3
            )
          )} USD</div>`;
          // MEDIAN WEALTH PER ADULT
          wealthEstimatesBySingleCountryMedianWealthBarChart.data.labels =
            labels;
          wealthEstimatesBySingleCountryMedianWealthBarChart.data.datasets[0].data =
            wealthEstimatesbySingleCountryData.medianWealthPerAdult;
          // update wealth info
          medianWealthInfo.innerHTML = `<summary>Median wealth per adult information</summary><div>Years: ${
            allYears[yearOne]
          } to ${allYears[yearTwo - 1]}</div><div>Range: ${range(
            wealthEstimatesbySingleCountryData.medianWealthPerAdult
          )} USD</div><div>Average change rate: ${naIfNaN(
            roundTo(
              mean(
                percentChange(
                  wealthEstimatesbySingleCountryData.medianWealthPerAdult
                )
              ),
              3
            )
          )} %</div><div>Average change per year: ${naIfNaN(
            roundTo(
              mean(
                difference(
                  wealthEstimatesbySingleCountryData.medianWealthPerAdult
                )
              ),
              3
            )
          )} USD</div><div>Median change per year: ${naIfNaN(
            roundTo(
              median(
                difference(
                  wealthEstimatesbySingleCountryData.medianWealthPerAdult
                )
              ),
              3
            )
          )} USD</div>`;
          // COMPONENTS OF WEALTH
          wealthEstimatesBySingleCountryWealthComponentsBarChart.data.labels =
            labels;
          wealthEstimatesBySingleCountryWealthComponentsBarChart.data.datasets[0].data =
            wealthEstimatesbySingleCountryData.financialWealth;
          wealthEstimatesBySingleCountryWealthComponentsBarChart.data.datasets[1].data =
            wealthEstimatesbySingleCountryData.nonFinancialWealth;
          wealthEstimatesBySingleCountryWealthComponentsBarChart.data.datasets[2].data =
            wealthEstimatesbySingleCountryData.debtPerAdult;
          // update wealth info
          wealthComponentsInfo.innerHTML = `<summary>Components of wealth information</summary><div>Years: ${
            allYears[yearOne]
          } to ${
            allYears[yearTwo - 1]
          }</div><div>Financial wealth per adult:</div><div><pre>  Range: ${range(
            wealthEstimatesbySingleCountryData.financialWealth
          )} USD</pre></div><div><pre>  Average change rate: ${naIfNaN(
            roundTo(
              mean(
                percentChange(
                  wealthEstimatesbySingleCountryData.financialWealth
                )
              ),
              3
            )
          )} %</pre></div><div><pre>  Average change per year: ${naIfNaN(
            roundTo(
              mean(
                difference(wealthEstimatesbySingleCountryData.financialWealth)
              ),
              3
            )
          )} USD</pre></div><div><pre>  Median change per year: ${naIfNaN(
            roundTo(
              median(
                difference(wealthEstimatesbySingleCountryData.financialWealth)
              ),
              3
            )
          )} USD</pre></div><div>Non-financial wealth per adult</div><div><pre>  Range: ${range(
            wealthEstimatesbySingleCountryData.nonFinancialWealth
          )} USD</pre></div><div><pre>  Average change rate: ${naIfNaN(
            roundTo(
              mean(
                percentChange(
                  wealthEstimatesbySingleCountryData.nonFinancialWealth
                )
              ),
              3
            )
          )} %</pre></div><div><pre>  Average change per year: ${naIfNaN(
            roundTo(
              mean(
                difference(
                  wealthEstimatesbySingleCountryData.nonFinancialWealth
                )
              ),
              3
            )
          )} USD</pre></div><div><pre>  Median change per year: ${naIfNaN(
            roundTo(
              median(
                difference(
                  wealthEstimatesbySingleCountryData.nonFinancialWealth
                )
              ),
              3
            )
          )} USD</pre></div><div>Debt per adult:</div><div><pre>  Range: ${range(
            wealthEstimatesbySingleCountryData.debtPerAdult
          )} USD</pre></div><div><pre>  Average change rate: ${naIfNaN(
            roundTo(
              mean(
                percentChange(wealthEstimatesbySingleCountryData.debtPerAdult)
              ),
              3
            )
          )} %</pre></div><div><pre>  Average change per year: ${naIfNaN(
            roundTo(
              mean(difference(wealthEstimatesbySingleCountryData.debtPerAdult)),
              3
            )
          )} USD</pre></div><div><pre>  Median change per year: ${naIfNaN(
            roundTo(
              median(
                difference(wealthEstimatesbySingleCountryData.debtPerAdult)
              ),
              3
            )
          )} USD</pre></div>`;
          // SHARE OF WEALTH
          wealthEstimatesBySingleCountryShareOfWealthBarChart.data.labels =
            labels;
          wealthEstimatesBySingleCountryShareOfWealthBarChart.data.datasets[0].data =
            wealthEstimatesbySingleCountryData.shareOfWealth;
          //   title
          wealthEstimatesBySingleCountryShareOfWealthBarChart.options.plugins.title.text = `${selectedWealthEstimatesBySingleCountry.innerText} - Share of wealth [%]`;

          // SHARE OF WEALTH
          wealthEstimatesBySingleCountryShareOfWealthBarChart.data.labels =
            labels;
          wealthEstimatesBySingleCountryShareOfWealthBarChart.data.datasets[0].data =
            wealthEstimatesbySingleCountryData.shareOfWealth;
          // update wealth info
          shareOfWealthInfo.innerHTML = `<summary>Share of wealth information</summary><div>Years: ${
            allYears[yearOne]
          } to ${allYears[yearTwo - 1]}</div><div>Range: ${roundTo(
            range(wealthEstimatesbySingleCountryData.shareOfWealth),
            3
          )} % units</div><div>Average change rate: ${naIfNaN(
            roundTo(
              mean(
                percentChange(wealthEstimatesbySingleCountryData.shareOfWealth)
              ),
              3
            )
          )} %</div><div>Average change per year: ${naIfNaN(
            roundTo(
              mean(
                difference(wealthEstimatesbySingleCountryData.shareOfWealth)
              ),
              3
            )
          )} % units</div><div>Median change per year: ${naIfNaN(
            roundTo(
              median(
                difference(wealthEstimatesbySingleCountryData.shareOfWealth)
              ),
              3
            )
          )} % units</div>`;

          // UPDATE CHARTS
          wealthEstimatesBySingleCountryTotalWealthBarChart.update();
          wealthEstimatesBySingleCountryWealthPerAdultBarChart.update();
          wealthEstimatesBySingleCountryMedianWealthBarChart.update();
          wealthEstimatesBySingleCountryWealthComponentsBarChart.update();
          wealthEstimatesBySingleCountryShareOfWealthBarChart.update();
        }
      );

      doubleSliderContainerSingleCountry.style.display = "block";
    }
  );
}

let wealthEstimatesBySingleCountryTotalWealthBarChart = new Chart(
  "wealth-estimates-by-single-country-total-wealth-chart",
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
          text: "Total wealth [USD Bn]",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let lblArray = [];
              lblArray.push(`Total wealth: ${context.parsed.y} USD Bn`);
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
  }
);

let wealthEstimatesBySingleCountryWealthPerAdultBarChart = new Chart(
  "wealth-estimates-by-single-country-wealth-per-adult-chart",
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
          borderWidth: 3,
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
          text: "Wealth per adult [USD]",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let lblArray = [];
              lblArray.push(`Wealth per adult: ${context.parsed.y} USD`);
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
  }
);

let wealthEstimatesBySingleCountryMedianWealthBarChart = new Chart(
  "wealth-estimates-by-single-country-median-wealth-chart",
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
          borderWidth: 3,
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
          text: "Median wealth per adult [USD]",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let lblArray = [];
              lblArray.push(`Median wealth per adult: ${context.parsed.y} USD`);
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
  }
);

let wealthEstimatesBySingleCountryWealthComponentsBarChart = new Chart(
  "wealth-estimates-by-single-country-wealth-components-chart",
  {
    type: "bar",
    data: {
      title: "",
      labels: componentsOfWealthUsd.wealthComponent.slice(0, 6),
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "rgba(233, 236, 239, 0.3)",
          hoverBackgroundColor: colorsHEX.antiflashWhite,
          borderColor: colorsHEX.antiflashWhite,
          borderWidth: 2,
          borderRadius: 18,
          borderSkipped: false,
          barPercentage: 0.6,
          stack: "stack 0",
          yAxisID: "y",
        },
        {
          label: "",
          data: [],
          backgroundColor: "rgba(52, 58, 64, 0.3)",
          hoverBackgroundColor: colorsHEX.onyx,
          borderColor: colorsHEX.onyx,
          borderWidth: 2,
          borderRadius: 18,
          borderSkipped: false,
          barPercentage: 0.6,
          stack: "stack 1",
          yAxisID: "y",
        },
        {
          label: "",
          data: [],
          backgroundColor: "rgba(233, 236, 239, 0.3)",
          hoverBackgroundColor: colorsHEX.antiflashWhite,
          borderColor: colorsHEX.antiflashWhite,
          borderWidth: 2,
          borderRadius: 18,
          borderSkipped: false,
          barPercentage: 0.6,
          stack: "stack 2",
          yAxisID: "y",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Components of wealth [USD]",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let componentYears = [2000, 2005, 2010, 2015, 2020, 2022];
              let lblArray = [];
              let componentsOfWealth = [
                "Financial Wealth",
                "Non-Financial Wealth",
                "Debt",
              ];
              lblArray.push(
                `${componentsOfWealth[context.datasetIndex]}: ${
                  context.parsed.y
                } USD`
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

let wealthEstimatesBySingleCountryShareOfWealthBarChart = new Chart(
  "wealth-estimates-by-single-country-share-of-wealth-chart",
  {
    type: "line",
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
          radius: 1,
          hoverBackgroundColor: colorsHEX.slateGray,
          pointHoverRadius: 6,
          yAxisID: "y",
        },
      ],
    },
    options: {
      aspectRatio: 2,
      plugins: {
        title: {
          display: true,
          text: "Share of world wealth [%]",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let lblArray = [];
              lblArray.push(`Share of world wealth: ${context.parsed.y} %`);
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
  }
);
