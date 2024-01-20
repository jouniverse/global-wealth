// distributionOfWealthByCountryPctOfWorld
// distributionOfWealthByRegionPctOfWorld
// distributionOfWealthByCountryPct
// distributionOfWealthByRegionPct
// wealthPerAdultRegion
// totalWealthRegion

// Table 4-6: Distribution of wealth for regions and selected markets, 2022,
// Percentage of world adults (in %)
let distributionOfWealthByCountryPctOfWorldMarket = [
  "Australia",
  "Austria",
  "Belgium",
  "Canada",
  "Chile",
  "Mainland China",
  "Colombia",
  "Czechia",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "India",
  "Indonesia",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Korea",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "Singapore",
  "South Africa",
  "Spain",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "Turkey",
  "United Kingdom",
  "United States",
];
let distributionOfWealthByCountryPctOfWorld = {
  market: [
    "Australia",
    "Austria",
    "Belgium",
    "Canada",
    "Chile",
    "Mainland China",
    "Colombia",
    "Czechia",
    "Denmark",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Korea",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Singapore",
    "South Africa",
    "Spain",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "Thailand",
    "Turkey",
    "United Kingdom",
    "United States",
  ],
  wealth_under_10k: [
    0.1, 0.1, 0, 0.2, 0.2, 7.6, 1, 0.1, 0, 0, 0.3, 0.2, 0.1, 0.1, 24.4, 4.5, 0,
    0, 0.3, 0.4, 0.2, 1.3, 0.1, 0, 0, 0.2, 0.1, 0.2, 2.2, 0, 1, 0.2, 0.1, 0,
    0.1, 1, 1.5, 0.4, 1.6,
  ],
  wealth_10k_to_100k: [
    0.2, 0.1, 0.1, 0.4, 0.4, 39.7, 0.4, 0.3, 0.1, 0.1, 0.7, 1.7, 0.2, 0.3, 12.1,
    3.1, 0, 0.1, 0.8, 2.2, 0.8, 2.3, 0.2, 0, 0.1, 1.1, 0.2, 0.5, 2.5, 0.1, 0.5,
    0.7, 0.1, 0.1, 0.4, 1.4, 0.9, 0.7, 4.2,
  ],
  wealth_100k_to_1m: [
    1.8, 0.5, 0.9, 2.3, 0.2, 25.3, 0.1, 0.2, 0.4, 0.3, 4.1, 4.2, 0.3, 0.1, 3,
    0.6, 0.2, 0.4, 3.8, 7.7, 3.1, 1.4, 1, 0.3, 0.3, 0.5, 0.4, 0.2, 0.6, 0.3,
    0.3, 2.9, 0.5, 0.4, 1.5, 0.2, 0.2, 4.2, 17.1,
  ],
  wealth_over_1m: [
    3.1, 0.5, 0.9, 3.4, 0.1, 10.5, 0.1, 0.1, 0.6, 0.2, 4.8, 4.4, 0.1, 0, 1.4,
    0.3, 0.3, 0.3, 2.2, 4.6, 2.1, 0.7, 2, 0.4, 0.6, 0.2, 0.3, 0.1, 0.7, 0.6,
    0.1, 1.9, 0.8, 1.9, 1.3, 0.1, 0.1, 4.3, 38.2,
  ],
  wealth_all_ranges: [
    0.4, 0.1, 0.2, 0.6, 0.3, 20.8, 0.7, 0.2, 0.1, 0.1, 0.9, 1.3, 0.2, 0.1, 17.4,
    3.5, 0.1, 0.1, 0.9, 1.9, 0.8, 1.6, 0.3, 0.1, 0.1, 0.6, 0.2, 0.3, 2.1, 0.1,
    0.7, 0.7, 0.1, 0.1, 0.4, 1, 1.1, 1, 4.7,
  ],
};

let distributionOfWealthByRegionPctOfWorldMarket = [
  "Africa",
  "Asia-Pacific",
  "China",
  "Europe",
  "India",
  "Latin America",
  "North America",
  "World",
];

let distributionOfWealthByRegionPctOfWorld = {
  market: [
    "Africa",
    "Asia-Pacific",
    "China",
    "Europe",
    "India",
    "Latin America",
    "North America",
    "World",
  ],
  wealth_under_10k: [22, 28.2, 7.6, 6.2, 24.4, 9.9, 1.8, 100],
  wealth_10k_to_100k: [4.4, 18.5, 39.7, 12.2, 12.1, 8.5, 4.6, 100],
  wealth_100k_to_1m: [1.2, 20.3, 25.3, 27, 3, 3.8, 19.4, 100],
  wealth_over_1m: [0.6, 16.5, 10.5, 27.4, 1.4, 2, 41.7, 100],
  wealth_all_ranges: [13.2, 23.8, 20.8, 11, 17.4, 8.6, 5.3, 100],
};

// Table 4-6: Distribution of wealth for regions and selected markets, 2022,
// Number of adults by wealth range (in %)
let distributionOfWealthByCountryPctMarket = [
  "Australia",
  "Austria",
  "Belgium",
  "Canada",
  "Chile",
  "Mainland China",
  "Colombia",
  "Czechia",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "India",
  "Indonesia",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Korea",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "Singapore",
  "South Africa",
  "Spain",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "Turkey",
  "United Kingdom",
  "United States",
];

let distributionOfWealthByCountryPct = {
  market: [
    "Australia",
    "Austria",
    "Belgium",
    "Canada",
    "Chile",
    "Mainland China",
    "Colombia",
    "Czechia",
    "Denmark",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Korea",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Singapore",
    "South Africa",
    "Spain",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "Thailand",
    "Turkey",
    "United Kingdom",
    "United States",
  ],
  wealth_under_10k: [
    9.9, 20.8, 12.8, 19.9, 38.7, 19.3, 76.1, 26.6, 15.1, 26.8, 15.5, 10, 22.3,
    20.3, 73.8, 67.7, 30.6, 16.5, 19.3, 11.6, 15.4, 41.5, 13.6, 20.8, 14.5, 23,
    22.7, 33.7, 55, 16, 73.5, 16.2, 34.3, 11.7, 12.4, 50.9, 70.6, 19.6, 17.5,
  ],
  wealth_10k_to_100k: [
    20.9, 34.2, 19.4, 24.6, 51.3, 65.6, 21.7, 55.7, 25, 28.7, 26.1, 46.1, 51.4,
    67.4, 24, 30.4, 22.3, 40.3, 28.9, 38.4, 34.6, 47.7, 32.7, 18.7, 29.1, 65.5,
    43, 58.2, 41, 34.2, 21.7, 31.7, 22.8, 32.9, 35.3, 46.2, 27.3, 24.9, 30.3,
  ],
  wealth_100k_to_1m: [
    59.8, 40.8, 61.9, 48.9, 9.6, 14.5, 2.1, 16.8, 51.9, 42.4, 52.7, 40, 25.4,
    12, 2.1, 1.9, 42.4, 40.2, 49.2, 47.4, 47.1, 10.3, 45, 53.5, 48.1, 11.2,
    32.3, 7.9, 3.6, 43.1, 4.6, 49.1, 37, 39.8, 48.5, 2.8, 2, 50.6, 43.2,
  ],
  wealth_over_1m: [
    9.4, 4.1, 5.9, 6.7, 0.4, 0.6, 0.1, 0.9, 8, 2.1, 5.6, 3.9, 0.9, 0.3, 0.1,
    0.1, 4.6, 3, 2.7, 2.6, 2.9, 0.4, 8.6, 6.9, 8.2, 0.3, 2, 0.3, 0.4, 6.7, 0.2,
    3, 5.9, 15.6, 3.9, 0.2, 0.1, 4.8, 9,
  ],
  wealth_all_ranges: [
    100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    100, 100, 100, 100, 100, 100, 100, 100, 100,
  ],
};
let distributionOfWealthByRegionPctMarket = [
  "Africa",
  "Asia-Pacific",
  "China",
  "Europe",
  "India",
  "Latin America",
  "North America",
  "World",
];
let distributionOfWealthByRegionPct = {
  market: [
    "Africa",
    "Asia-Pacific",
    "China",
    "Europe",
    "India",
    "Latin America",
    "North America",
    "World",
  ],
  wealth_under_10k: [87.4, 62.3, 19.3, 29.6, 73.8, 60.4, 17.8, 52.5],
  wealth_10k_to_100k: [11.4, 26.8, 65.6, 38.2, 24, 34, 29.6, 34.4],
  wealth_100k_to_1m: [1.1, 10.2, 14.5, 29.4, 2.1, 5.3, 43.8, 12],
  wealth_over_1m: [0.1, 0.8, 0.6, 2.8, 0.1, 0.3, 8.7, 1.1],
  wealth_all_ranges: [100, 100, 100, 100, 100, 100, 100, 100],
};

// [wealth_under_10k,wealth_10k_to_100k,wealth_100k_to_1m,wealth_over_1m]

// Table 4-2: Wealth per adult at current and smooth exchange rates, 2000-2022
// Wealth per adult 2000-2022
let wealthPerAdultRegionMarket = [
  "Africa",
  "Africa",
  "Asia-Pacific",
  "Asia-Pacific",
  "China",
  "China",
  "Europe",
  "Europe",
  "India",
  "India",
  "Latin America",
  "Latin America",
  "North America",
  "North America",
  "World",
  "World",
];

let wealthPerAdultRegion = {
  market: [
    "Africa",
    "Africa",
    "Asia-Pacific",
    "Asia-Pacific",
    "China",
    "China",
    "Europe",
    "Europe",
    "India",
    "India",
    "Latin America",
    "Latin America",
    "North America",
    "North America",
    "World",
    "World",
  ],
  exchangeRate: [
    "current",
    "smoothed",
    "current",
    "smoothed",
    "current",
    "smoothed",
    "current",
    "smoothed",
    "current",
    "smoothed",
    "current",
    "smoothed",
    "current",
    "smoothed",
    "current",
    "smoothed",
  ],
  y_2000: [
    1994, 2134, 34111, 27909, 4247, 6754, 62889, 68674, 2643, 3681, 8914, 8087,
    204934, 205747, 31389, 31593,
  ],
  y_2005: [
    3171, 2908, 38456, 34463, 9092, 14662, 109339, 96134, 4924, 6284, 12606,
    11386, 282166, 279325, 44275, 42750,
  ],
  y_2010: [
    5557, 4384, 54326, 39913, 24975, 30102, 138260, 111044, 9179, 8444, 23460,
    16683, 283549, 276848, 55835, 48991,
  ],
  y_2015: [
    6430, 5781, 49402, 47231, 43521, 45681, 131667, 129353, 10885, 11456, 23872,
    22021, 354950, 356115, 61007, 60621,
  ],
  y_2018: [
    6889, 6845, 55015, 52120, 60376, 64821, 150274, 147803, 14015, 14546, 26694,
    24083, 401087, 402392, 70510, 70429,
  ],
  y_2019: [
    7670, 7116, 57862, 54947, 63894, 69032, 158628, 156805, 14988, 15530, 27712,
    24746, 446414, 446406, 75308, 75275,
  ],
  y_2020: [
    8062, 7562, 61922, 57409, 66849, 68134, 179117, 166173, 14091, 14473, 25808,
    25017, 489161, 488693, 80830, 78483,
  ],
  y_2021: [
    8459, 8459, 63694, 63694, 77395, 77395, 183370, 183370, 16043, 16043, 28018,
    28018, 561328, 561328, 87916, 87916,
  ],
  y_2022: [
    8345, 9396, 61154, 67028, 75731, 85234, 177179, 188928, 16500, 18048, 32760,
    31143, 531826, 533620, 84718, 89745,
  ],
};

// Table 4-3: Total wealth at current and smooth exchange rates, 2000-2022
// Total wealth 2000-2022
let totalWealthRegionMarket = [
  "Africa",
  "Africa",
  "Asia-Pacific",
  "Asia-Pacific",
  "China",
  "China",
  "Europe",
  "Europe",
  "India",
  "India",
  "Latin America",
  "Latin America",
  "North America",
  "North America",
  "World",
  "World",
];
let totalWealthRegion = {
  market: [
    "Africa",
    "Africa",
    "Asia-Pacific",
    "Asia-Pacific",
    "China",
    "China",
    "Europe",
    "Europe",
    "India",
    "India",
    "Latin America",
    "Latin America",
    "North America",
    "North America",
    "World",
    "World",
  ],
  exchangeRate: [
    "current",
    "smoothed",
    "current",
    "smoothed",
    "current",
    "smoothed",
    "current",
    "smoothed",
    "current",
    "smoothed",
    "current",
    "smoothed",
    "current",
    "smoothed",
    "current",
    "smoothed",
  ],
  y_2000: [
    756, 809, 28535, 23347, 3704, 5891, 34507, 37682, 1553, 2163, 2719, 2467,
    46051, 46233, 117825, 118591,
  ],
  y_2005: [
    1388, 1272, 35926, 32196, 8522, 13743, 61805, 54341, 3266, 4168, 4291, 3875,
    67020, 66346, 182218, 175941,
  ],
  y_2010: [
    2808, 2215, 56402, 41438, 25493, 30727, 80229, 64436, 6810, 6265, 8823,
    6274, 71519, 69829, 252084, 221186,
  ],
  y_2015: [
    3736, 3359, 56345, 53869, 46535, 48845, 77419, 76058, 8948, 9418, 9842,
    9078, 94918, 95230, 297743, 295857,
  ],
  y_2018: [
    4355, 4327, 66006, 62533, 65943, 70797, 88612, 87155, 12182, 12644, 11574,
    10442, 110345, 110704, 359016, 358601,
  ],
  y_2019: [
    4989, 4629, 70537, 66983, 70211, 75858, 93559, 92483, 13264, 13744, 12208,
    10901, 123921, 123919, 388689, 388517,
  ],
  y_2020: [
    5396, 5061, 76661, 71074, 73866, 75285, 105640, 98006, 12688, 13032, 11542,
    11189, 136925, 136794, 422718, 410439,
  ],
  y_2021: [
    5824, 5824, 80045, 80045, 85947, 85947, 108113, 108113, 14690, 14690, 12712,
    12712, 158336, 158336, 465666, 465666,
  ],
  y_2022: [
    5909, 6653, 77974, 85463, 84485, 95087, 104410, 111333, 15365, 16806, 15071,
    14327, 151170, 151680, 454385, 481351,
  ],
};

function getRegionalDistributionData(wealthDistribution, region) {
  const regionIndices = wealthDistribution.market.reduce(
    (indices, currentRegion, index) => {
      if (currentRegion === region) {
        indices.push(index);
      }
      return indices;
    },
    []
  );

  if (regionIndices.length === 0) {
    console.error(`Region '${region}' not found in the data.`);
    return null;
  }
  const distributionData = {};
  const wealthRange = [
    "wealth_under_10k",
    "wealth_10k_to_100k",
    "wealth_100k_to_1m",
    "wealth_over_1m",
    "wealth_all_ranges",
  ];
  for (const rangeItem of wealthRange) {
    const rangeItemKey = rangeItem;
    distributionData[rangeItemKey] = [];

    for (const regionIndex of regionIndices) {
      if (
        wealthDistribution[rangeItemKey] &&
        wealthDistribution[rangeItemKey][regionIndex] !== undefined
      ) {
        const value = wealthDistribution[rangeItemKey][regionIndex];
        distributionData[rangeItemKey].push(value);
      } else {
        console.warn(
          `Data not available for '${region}' in rangeItem ${rangeItem}.`
        );
      }
    }
  }
  return distributionData;
}

function getRegionalDistributionArray(data) {
  const distributionArray = [];
  for (const rangeItemKey in data) {
    if (data.hasOwnProperty(rangeItemKey)) {
      distributionArray.push(...data[rangeItemKey]);
    }
  }
  return distributionArray;
}

// Example usage:
// distributionOfWealthByCountryPctOfWorld -> country
// distributionOfWealthByRegionPctOfWorld -> region
// distributionOfWealthByCountryPct -> country
// distributionOfWealthByRegionPct -> region
// const distributionData = getRegionalDistributionData(
//   distributionOfWealthByRegionPctOfWorld,
//   "North America"
// );
// console.log(distributionData);

const years = [2000, 2005, 2010, 2015, 2018, 2019, 2020, 2021, 2022];

function getAnnualDistributionData(wealthDistribution, region) {
  const regionIndices = wealthDistribution.market.reduce(
    (indices, currentRegion, index) => {
      if (currentRegion === region) {
        indices.push(index);
      }
      return indices;
    },
    []
  );

  if (regionIndices.length === 0) {
    console.error(`Region '${region}' not found in the data.`);
    return null;
  }
  const distributionData = {};
  for (const year of years) {
    const yearKey = `y_${year}`;
    distributionData[yearKey] = [];

    for (const regionIndex of regionIndices) {
      if (
        wealthDistribution[yearKey] &&
        wealthDistribution[yearKey][regionIndex] !== undefined
      ) {
        const value = wealthDistribution[yearKey][regionIndex];
        distributionData[yearKey].push(value);
      } else {
        console.warn(`Data not available for '${region}' in year ${year}.`);
      }
    }
  }

  return distributionData;
}

// Example usage:
// const africaDistributionData = getAnnualDistributionData(
//   totalWealthRegion,
//   "Africa"
// );
// console.log(Object.values(africaDistributionData));

// Extract values for all years
// const allYearValues = [];
// for (const yearKey in africaDistributionData) {
//   if (africaDistributionData.hasOwnProperty(yearKey)) {
//     allYearValues.push(...africaDistributionData[yearKey]);
//   }
// }
// console.log(allYearValues);

function getAnnualDistributionArray(data, parity = "even") {
  const distributionArray = [];
  for (const yearKey in data) {
    if (data.hasOwnProperty(yearKey)) {
      distributionArray.push(...data[yearKey]);
    }
  }
  if (parity === "even") {
    return distributionArray.filter((value, index) => index % 2 === 0);
  } else if (parity === "odd") {
    return distributionArray.filter((value, index) => index % 2 !== 0);
  }
}

// // Example usage
// const africaEvenValues = getAnnualDistributionArray(
//   africaDistributionData,
//   "even"
// );
// const africaOddValues = getAnnualDistributionArray(
//   africaDistributionData,
//   "odd"
// );
// console.log("Even Values:", africaEvenValues);
// console.log("Odd Values:", africaOddValues);

// console.log(
//   getAnnualDistributionArray(
//     getAnnualDistributionData(totalWealthRegion, "China"),
//     "even"
//   ).length
// );
// console.log(
//   getAnnualDistributionArray(
//     getAnnualDistributionData(totalWealthRegion, "China"),
//     "odd"
//   ).length
// );
// console.log(getAnnualDistributionData(totalWealthRegion, "China"));
