let hnwiCountryMarket = [
  "United States",
  "Mainland China",
  "France",
  "Japan",
  "Germany",
  "United Kingdom",
  "Canada",
  "Australia",
  "Italy",
  "Korea",
  "Netherlands",
  "Spain",
  "Switzerland",
  "India",
  "Taiwan",
  "Hong Kong SAR",
  "Belgium",
  "Sweden",
  "Brazil",
  "Russia",
  "Mexico",
  "Denmark",
  "Saudi Arabia",
  "Norway",
  "Singapore",
  "Austria",
  "New Zealand",
  "Iran",
  "United Arab Emirates",
  "Indonesia",
  "Israel",
  "Ireland",
  "Portugal",
  "Finland",
  "Poland",
  "Thailand",
  "South Africa",
  "Greece",
  "Czechia",
  "Egypt",
  "Philippines",
  "Chile",
  "Turkey",
  "Kazakhstan",
  "Malaysia",
  "Vietnam",
  "Nigeria",
  "Bangladesh",
  "Pakistan",
];

let hnwiCountry = {
  market: [
    "United States",
    "Mainland China",
    "France",
    "Japan",
    "Germany",
    "United Kingdom",
    "Canada",
    "Australia",
    "Italy",
    "Korea",
    "Netherlands",
    "Spain",
    "Switzerland",
    "India",
    "Taiwan",
    "Hong Kong SAR",
    "Belgium",
    "Sweden",
    "Brazil",
    "Russia",
    "Mexico",
    "Denmark",
    "Saudi Arabia",
    "Norway",
    "Singapore",
    "Austria",
    "New Zealand",
    "Iran",
    "United Arab Emirates",
    "Indonesia",
    "Israel",
    "Ireland",
    "Portugal",
    "Finland",
    "Poland",
    "Thailand",
    "South Africa",
    "Greece",
    "Czechia",
    "Egypt",
    "Philippines",
    "Chile",
    "Turkey",
    "Kazakhstan",
    "Malaysia",
    "Vietnam",
    "Nigeria",
    "Bangladesh",
    "Pakistan",
  ],
  wealth_1_5m: [
    18128940, 5547086, 2628568, 2597192, 2369770, 2390318, 1864062, 1691864,
    1225495, 1160465, 1098783, 1047851, 969637, 739957, 693463, 562423, 515891,
    417767, 365034, 352116, 367110, 337364, 317745, 323055, 294217, 275981,
    233524, 222136, 194327, 154156, 152508, 156051, 159044, 84212, 83173, 76297,
    77154, 71071, 66949, 68308, 58882, 55895, 52392, 50711, 44169, 36887, 34615,
    25917, 13493,
  ],
  wealth_5_10m: [
    2977359, 424000, 137305, 110856, 164543, 114371, 109739, 98656, 73708,
    68379, 52998, 60918, 83470, 63157, 46487, 40420, 15688, 30845, 27365, 29505,
    15915, 18770, 24737, 17293, 23269, 18733, 15626, 15870, 16609, 13045, 12735,
    9179, 6066, 5994, 3727, 5610, 4763, 5491, 5978, 5017, 5470, 3829, 4835,
    4115, 3705, 3082, 2412, 1156, 667,
  ],
  wealth_10_50m: [
    1479465, 226883, 51403, 45412, 83414, 47420, 53597, 46174, 32502, 21908,
    22242, 24472, 42797, 40359, 22268, 23639, 4178, 16889, 17983, 21465, 9247,
    9173, 10723, 10427, 13266, 6272, 5341, 7596, 8835, 8401, 7110, 4518, 2231,
    2022, 2482, 4409, 2455, 2247, 3690, 2546, 3768, 2201, 2920, 2605, 2591,
    1853, 1381, 423, 262,
  ],
  wealth_50_100m: [
    90661, 20257, 2638, 2838, 5573, 2664, 2878, 2341, 2355, 2088, 1007, 1447,
    2312, 3322, 1565, 1787, 192, 1091, 1809, 2441, 662, 516, 244, 455, 1045,
    468, 243, 239, 600, 699, 489, 246, 57, 235, 168, 467, 148, 85, 319, 180,
    373, 171, 320, 297, 284, 119, 71, 40, 35,
  ],
  wealth_100_500m: [
    31629, 11384, 1168, 1017, 3208, 1209, 1567, 1336, 1158, 1200, 395, 658,
    1058, 1931, 793, 1139, 94, 777, 1170, 1756, 334, 266, 77, 328, 616, 252, 89,
    119, 334, 401, 448, 96, 42, 119, 94, 273, 84, 28, 160, 94, 199, 91, 124,
    189, 177, 77, 60, 44, 41,
  ],
  wealth_500_plus: [
    1583, 1268, 82, 77, 315, 108, 112, 99, 99, 114, 23, 51, 92, 229, 86, 127,
    15, 54, 125, 294, 33, 26, 3, 27, 78, 32, 9, 51, 48, 55, 57, 15, 9, 27, 17,
    44, 10, 1, 33, 18, 35, 20, 31, 48, 32, 13, 17, 22, 23,
  ],
};

function sortByIndex(marketArray, propertyArray, ascending = false) {
  const indices = propertyArray.map((_, index) => index);
  if (ascending) {
    indices.sort((a, b) => propertyArray[a] - propertyArray[b]);
  } else {
    indices.sort((a, b) => propertyArray[b] - propertyArray[a]);
  }
  let sortedMarket = indices.map((index) => marketArray[index]);
  return {
    sortedMarket,
    sortedProperty: indices.map((index) => propertyArray[index]),
  };
}

function getHnwiCountryData(data, country) {
  let countryIdx = data.market.indexOf(country);
  let hnwiCountryArray = [];
  for (key in data) {
    hnwiCountryArray.push(data[key][countryIdx]);
  }
  return hnwiCountryArray.slice(1, hnwiCountryArray.length);
}

let hnwiWorld = [51549760, 5087934, 2510318, 163572, 72474, 7016];

// let countryIdx = hnwiCountryMarket.indexOf("United States");
// console.log(getHnwiCountryData(hnwiCountry, "United States"));
// console.log(hnwiCountryMarket);
// console.log(sortByIndex(hnwiCountry.market, hnwiCountry.wealth_5_10m));
