let sectionThreeOne = document.getElementById("section-3-1");
let sectionThreeTwo = document.getElementById("section-3-2");

sectionThreeOne.innerHTML = `<p class="txt-column" id="add-table">Percentage membership of global wealth deciles and top percentiles by region of residence. Global wealth deciles divide the world's population into ten equal groups based on their wealth. The first decile represents the poorest 10%, while the tenth decile includes the wealthiest 10%.</p><div id="hnwi-deciles-region" class="dropdown">
<div id="select-hnwi-deciles-region" class="select">
  <span id="selected-hnwi-deciles-region" class="selected">Select</span>
  <div class="caret"></div>
</div>
<ul class="menu"></ul>
</div>
<canvas id="hnwi-deciles-region-chart"></canvas>
<details id="hnwi-deciles-region-info"><summary id="hnwi-deciles-region-summary">Deciles by region</summary></details>`;

function generateTable(data) {
  let html =
    '<br><br><details class="table-details"><summary class="table-summary">Deciles by Region Globally</summary><div id="table"><table>';

  html += "<tr><th>Decile</th>";
  html += `<th>${data.market[0]}</th>`;
  html += `<th>${data.market[1]}</th></tr>`;

  for (let key in data) {
    if (key.startsWith("decile")) {
      let decileNumber = key.replace("decile_", "");

      html += `<tr><td>${decileNumber}</td>`;
      html += `<td>${data[key][0]}</td>`;
      html += `<td>${data[key][1]}</td></tr>`;
    } else if (key.startsWith("top")) {
      let decileNumber = key.replace("top_", "Top ");

      html += `<tr><td>${decileNumber}</td>`;
      html += `<td>${data[key][0]}</td>`;
      html += `<td>${data[key][1]}</td></tr>`;
    }
  }

  html += "</table></div></details>";
  return html;
}

let tableHtml = generateTable(decilesWorld);
let addTable = document.getElementById("add-table");
addTable.innerHTML += tableHtml;

sectionThreeTwo.innerHTML = `<p class="txt-column">Percentage membership of global wealth deciles and top percentiles by country of residence.</p><div id="hnwi-deciles-country" class="dropdown">
<div id="select-hnwi-deciles-country" class="select">
  <span id="selected-hnwi-deciles-country" class="selected">Select</span>
  <div class="caret"></div>
</div>
<ul class="menu"></ul>
</div>
<canvas id="hnwi-deciles-country-chart"></canvas>
<details id="hnwi-deciles-country-info"><summary id="hnwi-deciles-country-summary">Deciles by country</summary></details>`;

let hnwiDecilesRegionChart = document.getElementById(
  "hnwi-deciles-region-chart"
);
hnwiDecilesRegionChart.style.display = "none";
let hnwiDecilesCountryChart = document.getElementById(
  "hnwi-deciles-country-chart"
);
hnwiDecilesCountryChart.style.display = "none";
let hnwiDecilesRegionInfo = document.getElementById("hnwi-deciles-region-info");
hnwiDecilesRegionInfo.style.display = "none";
let hnwiDecilesCountryInfo = document.getElementById(
  "hnwi-deciles-country-info"
);
hnwiDecilesCountryInfo.style.display = "none";

let decileLabels = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Top 10%",
  "Top 5%",
  "Top 1%",
];

let hnwiDecileCountryData = [];
let hnwiDecileRegionData = [];

function init_hnwi_deciles() {
  addDropDown(
    decilesRegion.market,
    "hnwi-deciles-region",
    "section-3-1",
    "selected-hnwi-deciles-region",
    "select-hnwi-deciles-region"
  );

  addDropDown(
    decilesCountry.market,
    "hnwi-deciles-country",
    "section-3-2",
    "selected-hnwi-deciles-country",
    "select-hnwi-deciles-country"
  );

  let selectedHnwiDecilesRegion = document.getElementById(
    "selected-hnwi-deciles-region"
  );

  setTimeout(() => {
    triggerChangeEvent(selectedHnwiDecilesRegion);
  }, 100);

  selectedHnwiDecilesRegion.addEventListener("selectedChange", (e) => {
    hnwiDecilesRegionChart.style.display = "block";
    hnwiDecilesRegionInfo.style.display = "block";
    if (
      selectedHnwiDecilesRegion.innerText === "Select" ||
      !selectedHnwiDecilesRegion.innerText
    ) {
      hnwiDecilesRegionChart.style.display = "none";
      hnwiDecilesRegionInfo.style.display = "none";
      return;
    }

    hnwiDecileRegionData = getDecilesRegionData(
      decilesRegion,
      selectedHnwiDecilesRegion.innerText
    );

    hnwiDecilesRegionInfo.innerHTML = `<summary id="hnwi-deciles-region-summary">Deciles by region</summary><div>${selectedHnwiDecilesRegion.innerText}</div><div>Decile 1: ${hnwiDecileRegionData[0]} %</div><div>Decile 2: ${hnwiDecileRegionData[1]} %</div><div>Decile 3: ${hnwiDecileRegionData[2]} %</div><div>Decile 4: ${hnwiDecileRegionData[3]} %</div><div>Decile 5: ${hnwiDecileRegionData[4]} %</div><div>Decile 6: ${hnwiDecileRegionData[5]} %</div><div>Decile 7: ${hnwiDecileRegionData[6]} %</div><div>Decile 8: ${hnwiDecileRegionData[7]} %</div><div>Decile 9: ${hnwiDecileRegionData[8]} %</div><div>Top 10%: ${hnwiDecileRegionData[9]} %</div><div>Top 5%: ${hnwiDecileRegionData[10]} %</div><div>Top 1%: ${hnwiDecileRegionData[11]} %</div>`;

    hnwiDecilesByRegionBarChart.data.labels = decileLabels;
    hnwiDecilesByRegionBarChart.data.datasets[0].data = hnwiDecileRegionData;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      hnwiDecilesByRegionBarChart.options.plugins.tooltip.titleFont.size = 14;
      hnwiDecilesByRegionBarChart.options.plugins.tooltip.bodyFont.size = 16;
      hnwiDecilesByRegionBarChart.options.aspectRatio = 1;
      hnwiDecilesByRegionBarChart.data.datasets[0].borderWidth = 1;
    }

    hnwiDecilesByRegionBarChart.update();
  });

  let selectedHnwiDecilesCountry = document.getElementById(
    "selected-hnwi-deciles-country"
  );

  setTimeout(() => {
    triggerChangeEvent(selectedHnwiDecilesCountry);
  }, 100);

  selectedHnwiDecilesCountry.addEventListener("selectedChange", (e) => {
    hnwiDecilesCountryChart.style.display = "block";
    hnwiDecilesCountryInfo.style.display = "block";
    if (
      selectedHnwiDecilesCountry.innerText === "Select" ||
      !selectedHnwiDecilesCountry.innerText
    ) {
      hnwiDecilesCountryChart.style.display = "none";
      hnwiDecilesCountryInfo.style.display = "none";
      return;
    }

    hnwiDecileCountryData = getDecilesCountryData(
      decilesCountry,
      selectedHnwiDecilesCountry.innerText
    );

    hnwiDecilesCountryInfo.innerHTML = `<summary id="hnwi-deciles-region-summary">Deciles by country</summary><div>${selectedHnwiDecilesCountry.innerText}</div><div>Decile 1: ${hnwiDecileCountryData[0]} %</div><div>Decile 2: ${hnwiDecileCountryData[1]} %</div><div>Decile 3: ${hnwiDecileCountryData[2]} %</div><div>Decile 4: ${hnwiDecileCountryData[3]} %</div><div>Decile 5: ${hnwiDecileCountryData[4]} %</div><div>Decile 6: ${hnwiDecileCountryData[5]} %</div><div>Decile 7: ${hnwiDecileCountryData[6]} %</div><div>Decile 8: ${hnwiDecileCountryData[7]} %</div><div>Decile 9: ${hnwiDecileCountryData[8]} %</div><div>Top 10%: ${hnwiDecileCountryData[9]} %</div><div>Top 5%: ${hnwiDecileCountryData[10]} %</div><div>Top 1%: ${hnwiDecileCountryData[11]} %</div>`;

    hnwiDecilesByCountryBarChart.data.labels = decileLabels;
    hnwiDecilesByCountryBarChart.data.datasets[0].data = hnwiDecileCountryData;

    if (detectMobile()) {
      Chart.defaults.font.size = 8;
      hnwiDecilesByCountryBarChart.options.plugins.tooltip.titleFont.size = 14;
      hnwiDecilesByCountryBarChart.options.plugins.tooltip.bodyFont.size = 16;
      hnwiDecilesByCountryBarChart.options.aspectRatio = 1;
      hnwiDecilesByCountryBarChart.data.datasets[0].borderWidth = 1;
    }

    hnwiDecilesByCountryBarChart.update();
  });
}

let hnwiDecilesByRegionBarChart = new Chart("hnwi-deciles-region-chart", {
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
        text: "Deciles by region %",
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            if (context[0].dataIndex < 9) {
              return "";
            } else {
              return context[0].label;
            }
          },
          label: function (context) {
            let lblArray = [];
            if (context.dataIndex < 9) {
              lblArray.push(`Decile: ${decileLabels[context.dataIndex]}`);
              lblArray.push(`${context.parsed.y} % of world decile total`);
            } else {
              lblArray.push(
                `${context.parsed.y} % of world top percentile total`
              );
            }
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

let hnwiDecilesByCountryBarChart = new Chart("hnwi-deciles-country-chart", {
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
        text: "Deciles by country %",
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            if (context[0].dataIndex < 9) {
              return "";
            } else {
              return context[0].label;
            }
          },
          label: function (context) {
            let lblArray = [];
            if (context.dataIndex < 9) {
              lblArray.push(`Decile: ${decileLabels[context.dataIndex]}`);
            }
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
