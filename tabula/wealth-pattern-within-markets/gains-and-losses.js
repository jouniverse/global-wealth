// Table 3-5: Main gains and losses in global wealth distribution, adults (thousand), 2022
let wealthAbove1mGains = {
  market: [
    "Brazil",
    "Iran",
    "Norway",
    "Mexico",
    "Russia",
    "Austria",
    "Saudi Arabia",
    "Singapore",
    "United Arab Emirates",
    "Netherlands",
  ],
  wealth_above_1m_2021_gains: [
    293, 142, 247, 323, 351, 265, 318, 301, 200, 1158,
  ],
  wealth_above_1m_2022_gains: [
    413, 246, 352, 393, 408, 302, 354, 332, 221, 1175,
  ],
  change: [120, 104, 104, 70, 56, 36, 35, 31, 21, 17],
};

let globalTop10Gains = {
  market: [
    "United States",
    "Brazil",
    "Mexico",
    "India",
    "Iran",
    "Germany",
    "Kuwait",
    "Russia",
    "Korea",
    "Kazakhstan",
  ],
  global_top_10_2021_gains: [
    102021, 4019, 6045, 11958, 2932, 24707, 342, 3433, 18235, 515,
  ],
  global_top_10_2022_gains: [
    110219, 5520, 7171, 13078, 3769, 25356, 717, 3773, 18559, 740,
  ],
  change: [8198, 1500, 1126, 1121, 838, 649, 375, 340, 324, 226],
};

let globalTop1Gains = {
  market: [
    "Mainland China",
    "France",
    "Netherlands",
    "Brazil",
    "Iran",
    "Korea",
    "Mexico",
    "Norway",
    "Russia",
    "India",
  ],
  global_top_1_2021_gains: [5121, 2245, 895, 228, 98, 1003, 260, 194, 297, 689],
  global_top_1_2022_gains: [
    5583, 2483, 1087, 373, 213, 1106, 347, 273, 371, 763,
  ],
  change: [462, 238, 193, 145, 116, 103, 87, 80, 74, 74],
};

let wealthAbove1mLosses = {
  market: [
    "United States",
    "Japan",
    "United Kingdom",
    "Australia",
    "Canada",
    "Germany",
    "Italy",
    "Sweden",
    "Taiwan",
    "New Zealand",
  ],
  wealth_above_1m_2021_losses: [
    24480, 3224, 2995, 2203, 2331, 2880, 1457, 587, 848, 330,
  ],
  wealth_above_1m_2022_losses: [
    22710, 2757, 2556, 1840, 2032, 2627, 1335, 467, 765, 255,
  ],
  change: [-1770, -466, -439, -363, -299, -253, -121, -120, -83, -75],
};

let globalTop10Losses = {
  market: [
    "Japan",
    "Mainland China",
    "France",
    "Italy",
    "Netherlands",
    "Egypt",
    "Sweden",
    "Canada",
    "Australia",
    "Turkey",
  ],
  global_top_10_2021_losses: [
    46235, 107769, 25718, 20991, 6937, 1644, 3132, 15555, 12661, 983,
  ],
  global_top_10_2022_losses: [
    41984, 105619, 23804, 19793, 6242, 1161, 2802, 15237, 12404, 832,
  ],
  change: [-4252, -2150, -1914, -1198, -695, -483, -329, -318, -257, -151],
};

let globalTop1Losses = {
  market: [
    "United States",
    "Japan",
    "Australia",
    "Canada",
    "United Kingdom",
    "Sweden",
    "New Zealand",
    "Egypt",
    "Germany",
    "Turkey",
  ],
  global_top_1_2021_losses: [
    22088, 2516, 1734, 1883, 2303, 488, 264, 87, 2363, 65,
  ],
  global_top_1_2022_losses: [
    21037, 2409, 1632, 1802, 2227, 418, 238, 69, 2346, 55,
  ],
  change: [-1051, -108, -102, -81, -76, -70, -27, -18, -17, -10],
};

let globalGainsAndLosses = {
  wealth_above_usd_1m: [62899, 59391, -3508],
  global_top_10_pct: [529675, 536358, 6683],
  global_top_1_pct: [52967, 53636, 669],
};

function getGainsAndLossesStackData(data, item) {
  let stackData = [];
  let itemIdx = data.market.indexOf(item);
  for (key in data) {
    if (key !== "market") {
      stackData.push(data[key][itemIdx]);
    }
  }
  return stackData;
}

// console.log(getGainsAndLossesStackData(wealthAbove1mGains, "Brazil"));
