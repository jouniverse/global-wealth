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
<li class="item active"><a href="#">Home</a></li>
<li class="item"><a href="wealth-distribution.html">Wealth Distribution</a></li>
<li class="item"><a href="private-wealth.html">Private Wealth</a></li>
<li class="item"><a href="about.html">About</a></li>
<li class="toggle">
    <div class="bar-1"></div>
    <div class="bar-2"></div>
    <div class="bar-3"></div> 
</li>
</ul>
<hr>
<h2>Global Wealth</h2>
<p>According to UBS the global net wealth was estimated to be around 454 trn USD in 2022. The global net wealth is expected to rise to around 629 trn USD in 2027. It is estimated that wealth per adult will reach USD 110,270 in 2027 and the number of millionaires will reach 86 million while the number of ultra-high-net-worth individuals (UHNWIs) is likely to rise to 372,000 individuals.
</p><table>
<h5>Global Wealth in 2022</h5>
<tr>
  <th>Region</th>
  <th><pre>
  Total Wealth 
  [USD Bn]</pre></th>
</tr>
<tr>
  <td>${wealthEstimatesByRegion.at(-1).Market[0]}</td>
  <td>${wealthEstimatesByRegion.at(-1).totalWealth[0]}</td>
</tr>
<tr>
  <td>${wealthEstimatesByRegion.at(-1).Market[1]}</td>
  <td>${wealthEstimatesByRegion.at(-1).totalWealth[1]}</td>
</tr>
<tr>
  <td>${wealthEstimatesByRegion.at(-1).Market[2]}</td>
  <td>${wealthEstimatesByRegion.at(-1).totalWealth[2]}</td>
</tr>
<tr>
  <td>${wealthEstimatesByRegion.at(-1).Market[3]}</td>
  <td>${wealthEstimatesByRegion.at(-1).totalWealth[3]}</td>
</tr>
<tr>
  <td>${wealthEstimatesByRegion.at(-1).Market[4]}</td>
  <td>${wealthEstimatesByRegion.at(-1).totalWealth[4]}</td>
</tr>
<tr>
  <td>${wealthEstimatesByRegion.at(-1).Market[5]}</td>
  <td>${wealthEstimatesByRegion.at(-1).totalWealth[5]}</td>
</tr>
<tr>
  <td>${wealthEstimatesByRegion.at(-1).Market[6]}</td>
  <td>${wealthEstimatesByRegion.at(-1).totalWealth[6]}</td>
</tr>
<tr>
  <td><strong>${wealthEstimatesByRegion.at(-1).Market[7]}</strong></td>
  <td><strong>${wealthEstimatesByRegion.at(-1).totalWealth[7]}</strong></td>
</tr>
</table>
<canvas id="netWealthChart"></canvas>
<p>The global wealth has been growing steadily since the beginning of the millennium with noticeable dips in 2008 and 2022 caused by the global financial crisis and the pandemic respectively. In the given timeline the global net wealth has roughly quadrupled from 118 trn USD in 2000 to 454 trn USD in 2022 with an average growth rate of 6.64 %.</p>
<canvas id="totalWealthChart"></canvas>
<details id="home-total-net-wealth-info"><summary id="home-total-net--wealth-summary">Total net wealth information</summary><div>Years 2000 to 2022</div><div>Range: ${range(
  totalNetWealthByYear
)} USD Bn</div><div>Average change rate: ${naIfNaN(
  roundTo(mean(percentChange(totalNetWealthByYear)), 3)
)} %</div><div>Average change per year: ${roundTo(
  mean(difference(totalNetWealthByYear)),
  3
)} USD Bn</div><div>Median change per year: ${roundTo(
  median(difference(totalNetWealthByYear)),
  3
)} USD Bn</div></details>
<hr><footer id="copyright">
© Jouni Rantanen ${year}
</footer>`;
parent.appendChild(overlay);

Chart.defaults.color = colorsHEX.platinum;

let currentYear = 2022;
const netWealthChart = new Chart("netWealthChart", {
  type: "doughnut",
  data: {
    labels: wealthEstimatesByRegion.at(-1).Market.slice(0, -1),
    datasets: [
      {
        backgroundColor: "transparent",
        hoverBackgroundColor: colorsHEX.antiflashWhite,
        borderColor: colorsHEX.antiflashWhite,
        borderWidth: 2,
        borderRadius: 36,
        borderSkipped: false,
        barPercentage: 0.8,
        data: wealthEstimatesByRegion.at(-1).totalWealth.slice(0, -1),
      },
    ],
  },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let lblArray = [];
            lblArray.push(`Year: 2022`);
            lblArray.push(`Total net wealth: ${context.parsed} Bn USD`);
            lblArray.push(
              `Share of global net wealth: ${
                wealthEstimatesByRegion.at(-1).shareOfWealth[context.dataIndex]
              } %`
            );
            lblArray.push(
              `Median wealth per adult: ${
                wealthEstimatesByRegion.at(-1).medianWealthPerAdult[
                  context.dataIndex
                ]
              } USD`
            );
            lblArray.push(
              `Wealth per adult: ${
                wealthEstimatesByRegion.at(-1).wealthPerAdult[context.dataIndex]
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
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        },
      },
    },
    cutoutPercentage: 80,
    aspectRatio: 2 / 1,
    legend: { display: true },
    scales: {
      // x: {
      //   display: false,
      // },
      // y: {
      //   display: false,
      // },
    },
  },
});

// difference changes the order of the array
totalNetWealthByYear = [];
wealthEstimatesByRegion.forEach((year) => {
  totalNetWealthByYear.push(year.totalWealth[regionIdx]);
});

const totalWealthChart = new Chart("totalWealthChart", {
  type: "line",
  data: {
    labels: wealthEstimatesYear,
    datasets: [
      {
        backgroundColor: "transparent",
        hoverBackgroundColor: colorsHEX.antiflashWhite,
        borderColor: colorsHEX.antiflashWhite,
        borderWidth: 3,
        radius: 0,
        pointHoverRadius: 4,
        data: totalNetWealthByYear,
      },
    ],
  },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context) {
            return "";
          },
          label: function (context) {
            console.log(context);
            let lblArray = [];
            lblArray.push(`Year: 2022`);
            lblArray.push(`Total net wealth: ${context.parsed.y} USD Bn`);
            return lblArray;
          },
        },
        displayColors: false,
      },
      title: {
        display: true,
        text: "Total Net Wealth by Year [USD Bn]",
      },
      legend: {
        display: false,
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        },
      },
    },
    aspectRatio: 2 / 1,
    legend: { display: true },
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

if (detectMobile()) {
  Chart.defaults.font.size = 8;
  netWealthChart.options.aspectRatio = 1;
  netWealthChart.data.datasets[0].borderRadius = 16;
  netWealthChart.options.plugins.tooltip.titleFont.size = 16;
  netWealthChart.options.plugins.tooltip.bodyFont.size = 14;
  totalWealthChart.options.aspectRatio = 1.5 / 1;
  totalWealthChart.options.plugins.tooltip.titleFont.size = 16;
  totalWealthChart.options.plugins.tooltip.bodyFont.size = 14;
}
