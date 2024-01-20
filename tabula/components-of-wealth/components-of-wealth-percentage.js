// Table 2-4: Components of wealth as percentage of gross wealth, by region and year
let componentsOfWealthPercentage = {
  region: [
    "Africa",
    "Africa",
    "Africa",
    "Asia-Pacific",
    "Asia-Pacific",
    "Asia-Pacific",
    "China",
    "China",
    "China",
    "Europe",
    "Europe",
    "Europe",
    "India",
    "India",
    "India",
    "Latin America",
    "Latin America",
    "Latin America",
    "North America",
    "North America",
    "North America",
    "World",
    "World",
    "World",
  ],
  wealthComponent: [
    "Financial wealth",
    "Non-financial wealth",
    "Debts",
    "Financial wealth",
    "Non-financial wealth",
    "Debts",
    "Financial wealth",
    "Non-financial wealth",
    "Debts",
    "Financial wealth",
    "Non-financial wealth",
    "Debts",
    "Financial wealth",
    "Non-financial wealth",
    "Debts",
    "Financial wealth",
    "Non-financial wealth",
    "Debts",
    "Financial wealth",
    "Non-financial wealth",
    "Debts",
    "Financial wealth",
    "Non-financial wealth",
    "Debts",
  ],
  y_2000: [
    40.6, 59.4, 9.1, 50, 50, 14.5, 36.4, 63.6, 1.4, 48.5, 51.5, 13.5, 24.1,
    75.9, 6.1, 38.4, 61.6, 10.9, 67.4, 32.6, 13.9, 55.4, 44.6, 13.4,
  ],
  y_2005: [
    44, 56, 11.1, 52.3, 47.7, 12.5, 37.4, 62.6, 4.4, 42.5, 57.5, 13.8, 24.1,
    75.9, 7.1, 39.1, 60.9, 10, 62.4, 37.6, 15.8, 51.3, 48.7, 13.7,
  ],
  y_2010: [
    42.5, 57.5, 11.1, 49.8, 50.2, 12.5, 40.9, 59.1, 5.6, 41, 59, 14.9, 24.2,
    75.8, 7.8, 40.6, 59.4, 12.1, 68.4, 31.6, 17.2, 50.6, 49.4, 13.9,
  ],
  y_2015: [
    38.9, 61.1, 8.3, 49.6, 50.4, 11.9, 43.4, 56.6, 7.6, 44.5, 55.5, 13.9, 21.6,
    78.4, 7.7, 44.8, 55.2, 11.2, 70.7, 29.3, 13.7, 53.1, 46.9, 12.2,
  ],
  y_2018: [
    44.9, 55.1, 8, 50, 50, 12.1, 42, 58, 9, 43.6, 56.4, 13.5, 20.6, 79.4, 8.1,
    44.5, 55.5, 9.8, 69.7, 30.3, 13.1, 51.9, 48.1, 12,
  ],
  y_2019: [
    45.1, 54.9, 7.7, 50.3, 49.7, 11.8, 42.8, 57.2, 9.5, 44.4, 55.6, 13, 20.5,
    79.5, 8.3, 44.4, 55.6, 10, 71.2, 28.8, 12.3, 53, 47, 11.6,
  ],
  y_2020: [
    44.1, 55.9, 7.2, 50.7, 49.3, 12.1, 44.2, 55.8, 10.8, 45.1, 54.9, 12.8, 23.9,
    76.1, 8.9, 45.8, 54.2, 10, 71.5, 28.5, 11.7, 53.9, 46.1, 11.7,
  ],
  y_2021: [
    44, 56, 6.9, 49.6, 50.4, 11.8, 44.7, 55.3, 10.8, 44.9, 55.1, 12.3, 21.8,
    78.2, 8.1, 45.2, 54.8, 9.6, 70.4, 29.6, 11, 53.6, 46.4, 11.2,
  ],
  y_2022: [
    44.3, 55.7, 6.9, 47.7, 52.3, 11.7, 45.4, 54.6, 10.7, 41.7, 58.3, 12.4, 21,
    79, 7.9, 43.2, 56.8, 9.3, 66.4, 33.6, 12, 51.1, 48.9, 11.5,
  ],
};

// function everyNth(array, nth, base) {
//   // Check if the array is empty, nth is not a positive integer, or base is not a positive integer
//   if (
//     !Array.isArray(array) ||
//     array.length === 0 ||
//     !Number.isInteger(nth) ||
//     nth <= 0 ||
//     !Number.isInteger(base) ||
//     base <= 0
//   ) {
//     return [];
//   }

//   // Initialize result array to store every nth element
//   const result = [];

//   // Adjust the starting index based on the specified base
//   let startIndex = nth - 1;

//   // Iterate through the array, starting from the adjusted index and incrementing by nth
//   for (let i = startIndex; i < array.length; i += base) {
//     result.push(array[i]);
//   }

//   return result;
// }

function getAnnualComponentDataPct(wealthDistribution, region) {
  const regionIndices = wealthDistribution.region.reduce(
    (indices, currentRegion, index) => {
      if (currentRegion === region) {
        indices.push(index);
      }
      return indices;
    },
    []
  );

  // console.log(regionIndices);

  if (regionIndices.length === 0) {
    console.error(`Region '${region}' not found in the data.`);
    return null;
  }

  const distributionData = {};

  const years = [2000, 2005, 2010, 2015, 2018, 2019, 2020, 2021, 2022];

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

function getRegionalComponentArrayPct(data, year) {
  return data[`y_${year}`];
}

// console.log(getAnnualComponentDataPct(componentsOfWealthPercentage, "Africa"));
// console.log(
//   getRegionalComponentArrayPct(
//     getAnnualComponentDataPct(componentsOfWealthPercentage, "Africa"),
//     "2000"
//   )
// );
