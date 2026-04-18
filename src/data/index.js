// Data index — barrel exports for all wealth data
import wealthEstimatesByRegion from "./wealth-estimates-by-region.json";
import wealthEstimatesByCountry from "./wealth-estimates-by-country.json";
import hnwiRegion from "./hnwi-region.json";
import hnwiCountry from "./hnwi-country.json";
import componentsOfWealthUsd from "./components-of-wealth-usd.json";
import componentsOfWealthPct from "./components-of-wealth-percentage.json";
import componentsRegionUsd from "./components-region-usd.json";
import componentsRegionPct from "./components-region-percentage.json";
import distribution from "./distribution.json";
import marketDetails from "./market-details.json";
import marketDetailsMarket from "./market-details-market.json";
import wealthPatternWithinMarkets from "./wealth-pattern-within-markets.json";
import deciles from "./deciles.json";
import gainsAndLosses from "./gains-and-losses.json";
import householdWealthChanges from "./household-wealth-changes.json";
import wealthPatternByRegion from "./wealth-pattern-by-region.json";
import membershipOfTopWealthGroups from "./membership-of-top-wealth-groups.json";
import sources from "./sources.json";
import homeData from "./home-data.json";

export {
  wealthEstimatesByRegion,
  wealthEstimatesByCountry,
  hnwiRegion,
  hnwiCountry,
  componentsOfWealthUsd,
  componentsOfWealthPct,
  componentsRegionUsd,
  componentsRegionPct,
  distribution,
  marketDetails,
  marketDetailsMarket,
  wealthPatternWithinMarkets,
  deciles,
  gainsAndLosses,
  householdWealthChanges,
  wealthPatternByRegion,
  membershipOfTopWealthGroups,
  sources,
  homeData,
};

// ── Accessor Helpers ──

const REGIONS = [
  "Africa",
  "Asia-Pacific",
  "China",
  "Europe",
  "India",
  "Latin America",
  "North America",
  "World",
];

const YEARS = wealthEstimatesByRegion.map((d) => d.year);

/**
 * Get wealth estimates for a specific year (by region)
 */
export function getRegionEstimates(year) {
  return wealthEstimatesByRegion.find((d) => d.year === year);
}

/**
 * Get wealth estimates for a specific year (by country)
 */
export function getCountryEstimates(year) {
  return wealthEstimatesByCountry.find((d) => d.year === year);
}

/**
 * Get total net wealth for all years for a given region index
 */
export function getTotalWealthTimeSeries(regionIndex) {
  return wealthEstimatesByRegion.map((d) => ({
    year: d.year,
    totalWealth: d.totalWealth[regionIndex],
  }));
}

/**
 * Get the world total wealth time series
 */
export function getWorldTotalWealthTimeSeries() {
  const worldIdx = REGIONS.indexOf("World");
  return getTotalWealthTimeSeries(worldIdx);
}

export { REGIONS, YEARS };
