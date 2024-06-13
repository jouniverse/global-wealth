let canvas = document.querySelector("canvas");
let parent = canvas.parentNode;
let wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
parent.replaceChild(wrapper, canvas);
wrapper.appendChild(canvas);
let overlay = document.createElement("div");
overlay.classList.add("overlay");

let date = new Date();
let year = date.getFullYear();
overlay.innerHTML += `<img class="logo-img" src="./img/ubs-logo-inv.png"></img><ul class="navbar">
<li class="item"><a href="home.html">Home</a></li>
<li class="item"><a href="wealth-distribution.html">Wealth Distribution</a></li>
<li class="item"><a href="private-wealth.html">Private Wealth</a></li>
<li class="item active"><a href="#">About</a></li>
<li class="toggle">
    <div class="bar-1"></div>
    <div class="bar-2"></div>
    <div class="bar-3"></div> 
</li>
</ul>
<hr>
<h2>About</h2>
<p><strong>Global Wealth</strong> app is based on the annual global wealth report by UBS<sup><a href="#ref-1" class="ref-link">1</a></sup>.
</p>
<p>With the app you can explore and visualise the global wealth distribution using different economic indicators. For many of the indicators only selected regions or markets are available in the data sources. Different descriptive statistics are provided in connection with the indicators.</p><hr>
<p>The data was extracted from the Global Wealth Report by UBS using <strong>Tabula.</strong><sup href="#ref-2" class="ref-link"><a>2,3</a></sup></p>
<hr>
<canvas id="histogram"></canvas>
<details id="histogram-info"><summary id="histogram-summary">Net wealth distribution 2022</summary><div>Wealth: ${wealthBinsWithWidth.bin[0]} USD  Bn: ${wealthBinsWithWidth.frequency[0]} countries</div><div>Wealth: ${wealthBinsWithWidth.bin[1]} USD Bn: ${wealthBinsWithWidth.frequency[1]} countries</div><div>Wealth: ${wealthBinsWithWidth.bin[2]} USD Bn: ${wealthBinsWithWidth.frequency[2]} countries</div><div>Wealth: ${wealthBinsWithWidth.bin[3]} USD Bn: ${wealthBinsWithWidth.frequency[3]} countries</div><div>Wealth: ${wealthBinsWithWidth.bin[4]} USD Bn: ${wealthBinsWithWidth.frequency[4]} countries</div><div>Wealth: ${wealthBinsWithWidth.bin[5]} USD Bn: ${wealthBinsWithWidth.frequency[5]} countries</div><div>Wealth: ${wealthBinsWithWidth.bin[6]} USD Bn: ${wealthBinsWithWidth.frequency[6]} countries</div></details>
<hr>
<sup id="ref-1">1<a class="ref-link" href="https://www.ubs.com/global/en/family-office-uhnw/reports/global-wealth-report-2023.html">UBS Global Wealth Report 2023</a></sup> 
<sup id="ref-2">2<a class="ref-link" href="https://tabula.technology/"> Tabula</a></sup>
<sup>3<a class="ref-link" href="https://github.com/tabulapdf/tabula"> Tabula GitHub</a></sup>
<hr><footer id="copyright">
© Jouni Rantanen ${year}
</footer>`;
parent.appendChild(overlay);

let wealthBins = Array.from({ length: 28 }, (_, i) => 5000 + i * 5000);
let totalWealthHistogramData = countFrequencyWithFixedBinWidth(
  wealthEstimatesByCountry.at(-1).totalWealth,
  5000
);
console.log(totalWealthHistogramData);

Chart.defaults.color = colorsHEX.platinum;

let totalWealthHistogram = new Chart("histogram", {
  type: "bar",
  data: {
    labels: wealthBins,
    datasets: [
      {
        label: "",
        data: totalWealthHistogramData,
        backgroundColor: "rgba(233, 236, 239, 0.3)",
        hoverBackgroundColor: colorsHEX.antiflashWhite,
        borderColor: colorsHEX.antiflashWhite,
        borderWidth: 1,
        borderRadius: 30,
        borderSkipped: false,
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  },
  options: {
    aspectRatio: 2,
    plugins: {
      title: {
        display: true,
        text: "Net wealth distribution 2022 - Number of countries per wealth bin",
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return "";
          },
          label: function (context) {
            let wealthBottom;
            let wealthTop;
            if (context.dataIndex === 0) {
              wealthBottom = 0;
            } else {
              wealthBottom = wealthBins[context.dataIndex - 1];
            }
            wealthTop = wealthBins[context.dataIndex];
            let lblArray = [];
            lblArray.push(
              `Wealth range: ${wealthBottom} - ${wealthTop} USD Bn`
            );
            lblArray.push(`Number of countries: ${context.parsed.y}`);
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
        title: {
          display: true,
          text: "Wealth USD Bn",
        },
      },
      y: {
        beginAtZero: true,
        type: "logarithmic",
        title: {
          display: true,
        },
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

totalWealthHistogram.options.plugins.title.font.size = 9;

if (detectMobile()) {
  Chart.defaults.font.size = 8;
  totalWealthHistogram.options.plugins.tooltip.titleFont.size = 14;
  totalWealthHistogram.options.plugins.tooltip.bodyFont.size = 16;
  totalWealthHistogram.options.aspectRatio = 1;
  totalWealthHistogram.data.datasets[0].borderRadius = 12;
  totalWealthHistogram.data.datasets[0].borderWidth = 0;
}
