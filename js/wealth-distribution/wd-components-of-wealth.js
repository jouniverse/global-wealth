let sectionThree = document.getElementById("section-3");
sectionThree.innerHTML += `<p class="txt-column">
  Components of wealth by region in USD ($) from 2000 to 2022.
  </p>
  <div id="components-of-wealth" class="dropdown">
    <div id="select-components-of-wealth" class="select">
      <span id="selected-components-of-wealth" class="selected">Select</span>
      <div class="caret"></div>
    </div>
    <ul class="menu"></ul>
</div>
  <canvas id="components-of-wealth-chart"></canvas>
  <canvas id="components-of-wealth-pct-chart"></canvas>
  `;

let componentsOfWealthChart = document.getElementById(
  "components-of-wealth-chart"
);
componentsOfWealthChart.style.display = "none";
let componentsOfWealthUsdData;

let componentsOfWealthPctChart = document.getElementById(
  "components-of-wealth-pct-chart"
);
componentsOfWealthPctChart.style.display = "none";
let componentsOfWealthPctData;

function init_components() {
  addDropDown(
    everyNth(componentsOfWealthUsd.region, 1, 6),
    "components-of-wealth",
    "section-3",
    "selected-components-of-wealth",
    "select-components-of-wealth"
  );

  // Initialize the second dropdown and trigger the change event
  let selectedComponentsOfWealthUsd = document.getElementById(
    "selected-components-of-wealth"
  );

  // Add a delay to ensure the second dropdown is fully initialized
  setTimeout(() => {
    triggerChangeEvent(selectedComponentsOfWealthUsd);
  }, 100);

  selectedComponentsOfWealthUsd.addEventListener("selectedChange", () => {
    componentsOfWealthChart.style.display = "block";
    componentsOfWealthPctChart.style.display = "block";
    if (selectedComponentsOfWealthUsd.innerText === "Select") {
      // Handle the "Select" option gracefully (e.g., hide or clear the chart)
      componentsOfWealthChart.style.display = "none";
      componentsOfWealthPctChart.style.display = "none";
      return;
    }
    let stackOneData = getRegionalComponentArrayUSD(
      getAnnualComponentDataUSD(
        componentsOfWealthUsd,
        selectedComponentsOfWealthUsd.innerText
      ),
      "2000"
    );
    let stackTwoData = getRegionalComponentArrayUSD(
      getAnnualComponentDataUSD(
        componentsOfWealthUsd,
        selectedComponentsOfWealthUsd.innerText
      ),
      "2005"
    );
    let stackThreeData = getRegionalComponentArrayUSD(
      getAnnualComponentDataUSD(
        componentsOfWealthUsd,
        selectedComponentsOfWealthUsd.innerText
      ),
      "2010"
    );
    let stackFourData = getRegionalComponentArrayUSD(
      getAnnualComponentDataUSD(
        componentsOfWealthUsd,
        selectedComponentsOfWealthUsd.innerText
      ),
      "2015"
    );
    let stackFiveData = getRegionalComponentArrayUSD(
      getAnnualComponentDataUSD(
        componentsOfWealthUsd,
        selectedComponentsOfWealthUsd.innerText
      ),
      "2020"
    );
    let stackSixData = getRegionalComponentArrayUSD(
      getAnnualComponentDataUSD(
        componentsOfWealthUsd,
        selectedComponentsOfWealthUsd.innerText
      ),
      "2022"
    );
    componentsOfWealthBarChart.data.datasets[0].data = stackOneData;
    componentsOfWealthBarChart.data.datasets[1].data = stackTwoData;
    componentsOfWealthBarChart.data.datasets[2].data = stackThreeData;
    componentsOfWealthBarChart.data.datasets[3].data = stackFourData;
    componentsOfWealthBarChart.data.datasets[4].data = stackFiveData;
    componentsOfWealthBarChart.data.datasets[5].data = stackSixData;
    //   update chart
    componentsOfWealthBarChart.options.plugins.title.text = `${selectedComponentsOfWealthUsd.innerText}: Components of wealth USD`;
    componentsOfWealthBarChart.options.plugins.legend.labels.boxWidth = 0;

    let stackOneDataPct = getRegionalComponentArrayPct(
      getAnnualComponentDataPct(
        componentsOfWealthPercentage,
        selectedComponentsOfWealthUsd.innerText
      ),
      "2000"
    );
    let stackTwoDataPct = getRegionalComponentArrayPct(
      getAnnualComponentDataPct(
        componentsOfWealthPercentage,
        selectedComponentsOfWealthUsd.innerText
      ),
      "2005"
    );
    let stackThreeDataPct = getRegionalComponentArrayPct(
      getAnnualComponentDataPct(
        componentsOfWealthPercentage,
        selectedComponentsOfWealthUsd.innerText
      ),
      "2010"
    );
    let stackFourDataPct = getRegionalComponentArrayPct(
      getAnnualComponentDataPct(
        componentsOfWealthPercentage,
        selectedComponentsOfWealthUsd.innerText
      ),
      "2015"
    );
    let stackFiveDataPct = getRegionalComponentArrayPct(
      getAnnualComponentDataPct(
        componentsOfWealthPercentage,
        selectedComponentsOfWealthUsd.innerText
      ),
      "2020"
    );
    let stackSixDataPct = getRegionalComponentArrayPct(
      getAnnualComponentDataPct(
        componentsOfWealthPercentage,
        selectedComponentsOfWealthUsd.innerText
      ),
      "2022"
    );
    componentsOfWealthPctBarChart.data.datasets[0].data = stackOneDataPct;
    componentsOfWealthPctBarChart.data.datasets[1].data = stackTwoDataPct;
    componentsOfWealthPctBarChart.data.datasets[2].data = stackThreeDataPct;
    componentsOfWealthPctBarChart.data.datasets[3].data = stackFourDataPct;
    componentsOfWealthPctBarChart.data.datasets[4].data = stackFiveDataPct;
    componentsOfWealthPctBarChart.data.datasets[5].data = stackSixDataPct;
    //   update chart
    componentsOfWealthPctBarChart.options.plugins.title.text = `${selectedComponentsOfWealthUsd.innerText}: Components of wealth %`;
    componentsOfWealthPctBarChart.options.plugins.legend.labels.boxWidth = 0;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      componentsOfWealthBarChart.options.plugins.tooltip.titleFont.size = 14;
      componentsOfWealthPctBarChart.options.plugins.tooltip.bodyFont.size = 16;
      componentsOfWealthBarChart.options.aspectRatio = 1;
      componentsOfWealthBarChart.options.plugins.tooltip.titleFont.size = 14;
      componentsOfWealthBarChart.options.plugins.tooltip.bodyFont.size = 14;
      componentsOfWealthPctBarChart.options.aspectRatio = 1;
      for (let i = 0; i < 6; i++) {
        componentsOfWealthPctBarChart.data.datasets[i].borderWidth = 1;
        componentsOfWealthBarChart.data.datasets[i].borderWidth = 1;
      }
    }

    //  update charts
    componentsOfWealthBarChart.update();
    componentsOfWealthPctBarChart.update();
  });
}

Chart.defaults.color = colorsHEX.platinum;
let componentsOfWealthBarChart = new Chart("components-of-wealth-chart", {
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
        borderWidth: 3,
        borderRadius: 18,
        borderSkipped: false,
        barPercentage: 0.8,
        stack: "stack 0",
        yAxisID: "y",
      },
      {
        label: "",
        data: [],
        backgroundColor: "rgba(52, 58, 64, 0.3)",
        hoverBackgroundColor: colorsHEX.onyx,
        borderColor: colorsHEX.onyx,
        borderWidth: 3,
        borderRadius: 18,
        borderSkipped: false,
        barPercentage: 0.8,
        stack: "stack 1",
        yAxisID: "y",
      },
      {
        label: "",
        data: [],
        backgroundColor: "rgba(233, 236, 239, 0.3)",
        hoverBackgroundColor: colorsHEX.antiflashWhite,
        borderColor: colorsHEX.antiflashWhite,
        borderWidth: 3,
        borderRadius: 18,
        borderSkipped: false,
        barPercentage: 0.8,
        stack: "stack 2",
        yAxisID: "y",
      },
      {
        label: "",
        data: [],
        backgroundColor: "rgba(52, 58, 64, 0.3)",
        hoverBackgroundColor: colorsHEX.onyx,
        borderColor: colorsHEX.onyx,
        borderWidth: 3,
        borderRadius: 18,
        borderSkipped: false,
        barPercentage: 0.8,
        stack: "stack 3",
        yAxisID: "y",
      },
      {
        label: "",
        data: [],
        backgroundColor: "rgba(233, 236, 239, 0.3)",
        hoverBackgroundColor: colorsHEX.antiflashWhite,
        borderColor: colorsHEX.antiflashWhite,
        borderWidth: 3,
        borderRadius: 18,
        borderSkipped: false,
        barPercentage: 0.8,
        stack: "stack 4",
        yAxisID: "y",
      },
      {
        label: "",
        data: [],
        backgroundColor: "rgba(52, 58, 64, 0.3)",
        hoverBackgroundColor: colorsHEX.onyx,
        borderColor: colorsHEX.onyx,
        borderWidth: 3,
        borderRadius: 18,
        borderSkipped: false,
        barPercentage: 0.8,
        stack: "stack 5",
        yAxisID: "y",
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Components of wealth",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            // console.log(context);
            let componentYears = [2000, 2005, 2010, 2015, 2020, 2022];
            let lblArray = [];
            // lblArray.push(`${context.dataset.label}`);
            lblArray.push(`Year: ${componentYears[context.datasetIndex]}`);
            lblArray.push(`Component of wealth: ${context.parsed.y} USD`);
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

let componentsOfWealthPctBarChart = new Chart(
  "components-of-wealth-pct-chart",
  {
    type: "bar",
    data: {
      labels: componentsOfWealthPercentage.wealthComponent.slice(0, 3),
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "rgba(233, 236, 239, 0.3)",
          hoverBackgroundColor: colorsHEX.antiflashWhite,
          borderColor: colorsHEX.antiflashWhite,
          borderWidth: 3,
          borderRadius: 18,
          borderSkipped: false,
          barPercentage: 0.8,
          stack: "stack 0",
          yAxisID: "y",
        },
        {
          label: "",
          data: [],
          backgroundColor: "rgba(52, 58, 64, 0.3)",
          hoverBackgroundColor: colorsHEX.onyx,
          borderColor: colorsHEX.onyx,
          borderWidth: 3,
          borderRadius: 18,
          borderSkipped: false,
          barPercentage: 0.8,
          stack: "stack 1",
          yAxisID: "y",
        },
        {
          label: "",
          data: [],
          backgroundColor: "rgba(233, 236, 239, 0.3)",
          hoverBackgroundColor: colorsHEX.antiflashWhite,
          borderColor: colorsHEX.antiflashWhite,
          borderWidth: 3,
          borderRadius: 18,
          borderSkipped: false,
          barPercentage: 0.8,
          stack: "stack 2",
          yAxisID: "y",
        },
        {
          label: "",
          data: [],
          backgroundColor: "rgba(52, 58, 64, 0.3)",
          hoverBackgroundColor: colorsHEX.onyx,
          borderColor: colorsHEX.onyx,
          borderWidth: 3,
          borderRadius: 18,
          borderSkipped: false,
          barPercentage: 0.8,
          stack: "stack 3",
          yAxisID: "y",
        },
        {
          label: "",
          data: [],
          backgroundColor: "rgba(233, 236, 239, 0.3)",
          hoverBackgroundColor: colorsHEX.antiflashWhite,
          borderColor: colorsHEX.antiflashWhite,
          borderWidth: 3,
          borderRadius: 18,
          borderSkipped: false,
          barPercentage: 0.8,
          stack: "stack 4",
          yAxisID: "y",
        },
        {
          label: "",
          data: [],
          backgroundColor: "rgba(52, 58, 64, 0.3)",
          hoverBackgroundColor: colorsHEX.onyx,
          borderColor: colorsHEX.onyx,
          borderWidth: 3,
          borderRadius: 18,
          borderSkipped: false,
          barPercentage: 0.8,
          stack: "stack 5",
          yAxisID: "y",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Components of wealth",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              // console.log(context);
              let componentYears = [2000, 2005, 2010, 2015, 2020, 2022];
              let lblArray = [];
              //   lblArray.push(`${context.dataset.label}`);
              lblArray.push(`Year: ${componentYears[context.datasetIndex]}`);
              lblArray.push(`Component of wealth: ${context.parsed.y} %`);
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
