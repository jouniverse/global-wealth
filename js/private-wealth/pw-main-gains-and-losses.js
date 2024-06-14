let sectionFour = document.getElementById("section-4");

sectionFour.innerHTML += `<p class="txt-column">Main gains and losses in the upper tail of the global wealth distribution.</p><div id="main-gains" class="dropdown">
<div id="select-main-gains-and-losses" class="select">
  <span id="selected-main-gains-and-losses" class="selected">Select</span>
  <div class="caret"></div>
</div>
<ul class="menu"></ul>
</div>
<div id="global-gains-and-losses"></div>
<canvas id="main-gains-chart"></canvas>
<details id="main-gains-info"><summary id="main-gains-summary">Main gains</summary></details>
<canvas id="main-losses-chart"></canvas>
<details id="main-losses-info"><summary id="main-losses-summary">Main losses</summary></details>`;

let globalGainsAndLossesBalance = document.getElementById(
  "global-gains-and-losses"
);
globalGainsAndLossesBalance.style.display = "none";
let mainGainsInfo = document.getElementById("main-gains-info");
mainGainsInfo.style.display = "none";
let mainGainsChart = document.getElementById("main-gains-chart");
mainGainsChart.style.display = "none";
let mainLossesInfo = document.getElementById("main-losses-info");
mainLossesInfo.style.display = "none";
let mainLossesChart = document.getElementById("main-losses-chart");
mainLossesChart.style.display = "none";

let gainsAndLossesMenuItems = [
  "Wealth above USD 1M",
  "Global top 10%",
  "Global top 1%",
];

let gainsData = {
  stack_0: [],
  stack_1: [],
  stack_2: [],
  stack_3: [],
  stack_4: [],
  stack_5: [],
  stack_6: [],
  stack_7: [],
  stack_8: [],
  stack_9: [],
  plot_0: [],
  plot_1: [],
  plot_2: [],
};
let gainsLabels = [];

let lossesData = {
  stack_0: [],
  stack_1: [],
  stack_2: [],
  stack_3: [],
  stack_4: [],
  stack_5: [],
  stack_6: [],
  stack_7: [],
  stack_8: [],
  stack_9: [],
  plot_0: [],
  plot_1: [],
  plot_2: [],
};
let lossesLabels = [];

function init_gains_and_losses() {
  addDropDown(
    gainsAndLossesMenuItems,
    "main-gains-and-losses",
    "section-4",
    "selected-main-gains-and-losses",
    "select-main-gains-and-losses"
  );

  let selectedMainGainsAndLosses = document.getElementById(
    "selected-main-gains-and-losses"
  );

  setTimeout(() => {
    triggerChangeEvent(selectedMainGainsAndLosses);
  }, 100);

  selectedMainGainsAndLosses.addEventListener("selectedChange", (e) => {
    globalGainsAndLossesBalance.style.display = "block";
    mainGainsChart.style.display = "block";
    mainGainsInfo.style.display = "block";
    mainLossesChart.style.display = "block";
    mainLossesInfo.style.display = "block";
    if (
      selectedMainGainsAndLosses.innerText === "Select" ||
      selectedMainGainsAndLosses.innerText === ""
    ) {
      globalGainsAndLossesBalance.style.display = "none";
      mainGainsChart.style.display = "none";
      mainGainsInfo.style.display = "none";
      mainLossesChart.style.display = "none";
      mainLossesInfo.style.display = "none";
      return;
    }

    function updateGainsData(selectedData, gainsData, gainsLabels) {
      for (let key in gainsData) {
        if (key.startsWith("stack_") || key.startsWith("plot_")) {
          gainsData[key].length = 0;
        }
      }

      for (let i = 0; i < 10; i++) {
        let marketItem = selectedData.market[i];

        gainsData[`stack_${i}`] = getGainsAndLossesStackData(
          selectedData,
          marketItem
        );
      }

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 3; j++) {
          gainsData[`plot_${j}`].push(gainsData[`stack_${i}`][j]);
        }
      }
    }

    function updateLossesData(selectedData, lossesData, lossesLabels) {
      for (let key in lossesData) {
        if (key.startsWith("stack_") || key.startsWith("plot_")) {
          lossesData[key].length = 0;
        }
      }

      for (let i = 0; i < 10; i++) {
        let marketItem = selectedData.market[i];

        lossesData[`stack_${i}`] = getGainsAndLossesStackData(
          selectedData,
          marketItem
        );
      }

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 3; j++) {
          lossesData[`plot_${j}`].push(lossesData[`stack_${i}`][j]);
        }
      }
    }

    let globalBalanceKey;
    switch (selectedMainGainsAndLosses.innerText) {
      case "Wealth above USD 1M":
        globalBalanceKey = "wealth_above_usd_1m";
        gainsLabels = wealthAbove1mGains.market;
        updateGainsData(wealthAbove1mGains, gainsData);
        lossesLabels = wealthAbove1mLosses.market;
        updateLossesData(wealthAbove1mLosses, lossesData);
        break;
      case "Global top 10%":
        globalBalanceKey = "global_top_10_pct";
        gainsLabels = globalTop10Gains.market;
        updateGainsData(globalTop10Gains, gainsData);
        lossesLabels = globalTop10Losses.market;
        updateLossesData(globalTop10Losses, lossesData);
        break;
      case "Global top 1%":
        globalBalanceKey = "global_top_1_pct";
        gainsLabels = globalTop1Gains.market;
        updateGainsData(globalTop1Gains, gainsData);
        lossesLabels = globalTop1Losses.market;
        updateLossesData(globalTop1Losses, lossesData);
        break;
      default:
        break;
    }

    mainGainsBarChart.data.labels = gainsLabels;
    mainGainsBarChart.data.datasets[0].data = gainsData.plot_0;
    mainGainsBarChart.data.datasets[1].data = gainsData.plot_1;
    mainGainsBarChart.data.datasets[2].data = gainsData.plot_2;
    mainLossesBarChart.data.labels = lossesLabels;
    mainLossesBarChart.data.datasets[0].data = lossesData.plot_0;
    mainLossesBarChart.data.datasets[1].data = lossesData.plot_1;
    mainLossesBarChart.data.datasets[2].data = lossesData.plot_2;

    globalGainsAndLossesBalance.innerHTML = `<h4>World [thousand adults]</h4><table><tr><th>2021</th><th>2022</th><th>Change</th></tr><tr><td>${globalGainsAndLosses[globalBalanceKey][0]}</td><td>${globalGainsAndLosses[globalBalanceKey][1]}</td><td>${globalGainsAndLosses[globalBalanceKey][2]}</td></tr></table>`;

    mainGainsInfo.innerHTML = `<summary id="main-gains-summary">Main gains</summary><div>Change range: ${roundTo(
      range(gainsData.plot_2),
      3
    )} thousand adults</div><div>Max: ${roundTo(
      max(gainsData.plot_2),
      3
    )} thousand adults</div><div>Min: ${roundTo(
      min(gainsData.plot_2),
      3
    )} thousand adults</div>`;

    mainLossesInfo.innerHTML = `<summary id="main-losses-summary">Main losses</summary><div>Change range: ${roundTo(
      range(lossesData.plot_2),
      3
    )} thousand adults</div><div>Max: ${roundTo(
      max(lossesData.plot_2),
      3
    )} thousand adults</div><div>Min: ${roundTo(
      min(lossesData.plot_2),
      3
    )} thousand adults</div>`;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      mainGainsBarChart.options.plugins.tooltip.titleFont.size = 14;
      mainGainsBarChart.options.plugins.tooltip.bodyFont.size = 16;
      mainGainsBarChart.options.aspectRatio = 1;
      mainGainsBarChart.data.datasets[0].borderWidth = 1;
      mainGainsBarChart.data.datasets[1].borderWidth = 1;
      mainGainsBarChart.data.datasets[2].borderWidth = 1;

      mainLossesBarChart.options.plugins.tooltip.titleFont.size = 14;
      mainLossesBarChart.options.plugins.tooltip.bodyFont.size = 16;
      mainLossesBarChart.options.aspectRatio = 1;
      mainLossesBarChart.data.datasets[0].borderWidth = 1;
      mainLossesBarChart.data.datasets[1].borderWidth = 1;
      mainLossesBarChart.data.datasets[2].borderWidth = 1;
    }

    mainGainsBarChart.update();
    mainLossesBarChart.update();
  });
}

let mainGainsBarChart = new Chart("main-gains-chart", {
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
        borderRadius: 18,
        borderSkipped: false,
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
        stack: "stack 2",
        yAxisID: "y",
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Top 10 countries: Main gains [thousand adults]",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let indicator = ["2021", "2022", "Change"];
            let lblArray = [];
            lblArray.push(
              `${indicator[context.datasetIndex]}: ${
                context.parsed.y
              } thousand adults`
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
});

let mainLossesBarChart = new Chart("main-losses-chart", {
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
        borderRadius: 18,
        borderSkipped: false,
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
        stack: "stack 2",
        yAxisID: "y1",
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Top 10 countries: Main losses [thousand adults]",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let indicator = ["2021", "2022", "Change"];
            let lblArray = [];
            lblArray.push(
              `${indicator[context.datasetIndex]}: ${
                context.parsed.y
              } thousand adults`
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
});
