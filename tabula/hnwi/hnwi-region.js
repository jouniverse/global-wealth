let hnwiRegionUsdMarket = [
  "North America",
  "Europe",
  "Asia-Pacific",
  "China",
  "Latin America",
  "India",
  "Africa",
  "World",
];

let hnwiRegionUSD = {
  market: [
    "North America",
    "Europe",
    "Asia-Pacific",
    "China",
    "Latin America",
    "India",
    "Africa",
    "World",
  ],
  wealth_1_5m: [
    19998158, 14948079, 8947576, 5547086, 1044621, 739957, 324287, 51549760,
  ],
  wealth_5_10m: [3087606, 874606, 540863, 424000, 73533, 63157, 24169, 5087934],
  wealth_10_50m: [
    1533298, 400226, 253897, 226883, 45005, 40359, 10649, 2510318,
  ],
  wealth_50_100m: [93563, 25086, 17013, 20257, 3489, 3322, 843, 163572],
  wealth_100_500m: [33207, 13461, 9344, 11384, 2427, 1931, 720, 72474],
  wealth_500_plus: [1700, 1543, 1347, 1268, 588, 229, 340, 7016],
};

let hnwiRegionPctMarket = [
  "North America",
  "Europe",
  "Asia-Pacific",
  "China",
  "Latin America",
  "India",
  "Africa",
  "World",
];

let hnwiRegionPct = {
  market: [
    "North America",
    "Europe",
    "Asia-Pacific",
    "China",
    "Latin America",
    "India",
    "Africa",
    "World",
  ],
  wealth_1_5m: [38.8, 29, 17.4, 10.8, 2, 1.4, 0.6, 100],
  wealth_5_10m: [60.7, 17.2, 10.6, 8.3, 1.4, 1.2, 0.5, 100],
  wealth_10_50m: [61.1, 15.9, 10.1, 9, 1.8, 1.6, 0.4, 100],
  wealth_50_100m: [57.2, 15.3, 10.4, 12.4, 2.1, 2, 0.5, 100],
  wealth_100_500m: [45.8, 18.6, 12.9, 15.7, 3.3, 2.7, 1, 100],
  wealth_500_plus: [24.2, 22, 19.2, 18.1, 8.4, 3.3, 4.8, 100],
};

//
function getHnwiRegionData(dataUSD, dataPct, regionIdx) {
  let hnwiRegionUSDArray = [];
  let hnwiRegionPctArray = [];
  for (key in dataUSD) {
    hnwiRegionUSDArray.push(dataUSD[key][regionIdx]);
    hnwiRegionPctArray.push(dataPct[key][regionIdx]);
  }
  return [
    hnwiRegionUSDArray.slice(1, hnwiRegionUSDArray.length),
    hnwiRegionPctArray.slice(1, hnwiRegionPctArray.length),
  ];
}

// let regionIdx = hnwiRegionUsdMarket.indexOf("Africa");
// console.log(getHnwiRegionData(hnwiRegionUSD, hnwiRegionPct, regionIdx));
