/**
 * Script to convert tabula JS data files into JSON modules.
 * Run: node convert-data.js
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TABULA_DIR = join(__dirname, "..", "tabula");
const DATA_DIR = join(__dirname, "data");

// Mapping: source file → { outputFile, variableNames[] }
const conversions = [
  {
    input: "wealth-estimates/wealth-estimates-by-region.js",
    output: "wealth-estimates-by-region.json",
    extract: (code) => {
      // Extract all year_XXXX_region objects and the array
      const yearPattern = /let (year_\d{4}_region) = (\{[\s\S]*?\n\});/g;
      const years = {};
      let match;
      while ((match = yearPattern.exec(code)) !== null) {
        years[match[1]] = eval(`(${match[2]})`);
      }
      // Build the array
      const yearKeys = Object.keys(years).sort();
      return yearKeys.map((k) => {
        const year = parseInt(k.match(/\d{4}/)[0]);
        return { year, ...years[k] };
      });
    },
  },
  {
    input: "wealth-estimates/wealth-estimates-by-country.js",
    output: "wealth-estimates-by-country.json",
    extract: (code) => {
      const yearPattern = /let (year_\d{4}_country) = (\{[\s\S]*?\n\});/g;
      const years = {};
      let match;
      while ((match = yearPattern.exec(code)) !== null) {
        years[match[1]] = eval(`(${match[2]})`);
      }
      const yearKeys = Object.keys(years).sort();
      return yearKeys.map((k) => {
        const year = parseInt(k.match(/\d{4}/)[0]);
        return { year, ...years[k] };
      });
    },
  },
  {
    input: "hnwi/hnwi-region.js",
    output: "hnwi-region.json",
    extract: (code) => {
      const m1 = code.match(
        /let hnwiRegionUSD = (\{[\s\S]*?\n\});/
      );
      const m2 = code.match(
        /let hnwiRegionPct = (\{[\s\S]*?\n\});/
      );
      return {
        usd: m1 ? eval(`(${m1[1]})`) : null,
        pct: m2 ? eval(`(${m2[1]})`) : null,
      };
    },
  },
  {
    input: "hnwi/hnwi-country.js",
    output: "hnwi-country.json",
    extract: (code) => {
      const m1 = code.match(
        /let hnwiCountryUSD = (\{[\s\S]*?\n\});/
      );
      const m2 = code.match(
        /let hnwiCountryPct = (\{[\s\S]*?\n\});/
      );
      return {
        usd: m1 ? eval(`(${m1[1]})`) : null,
        pct: m2 ? eval(`(${m2[1]})`) : null,
      };
    },
  },
  {
    input: "components-of-wealth/components-of-wealth-usd.js",
    output: "components-of-wealth-usd.json",
    extract: (code) => {
      const pattern = /let (componentsOfWealth\w+USD) = (\{[\s\S]*?\n\});/g;
      const result = {};
      let match;
      while ((match = pattern.exec(code)) !== null) {
        result[match[1]] = eval(`(${match[2]})`);
      }
      return result;
    },
  },
  {
    input: "components-of-wealth/components-of-wealth-percentage.js",
    output: "components-of-wealth-percentage.json",
    extract: (code) => {
      const pattern = /let (componentsOfWealth\w+Pct) = (\{[\s\S]*?\n\});/g;
      const result = {};
      let match;
      while ((match = pattern.exec(code)) !== null) {
        result[match[1]] = eval(`(${match[2]})`);
      }
      return result;
    },
  },
  {
    input: "distribution-of-wealth/distribution.js",
    output: "distribution.json",
    extract: (code) => {
      const pattern = /let (\w+) = (\{[\s\S]*?\n\});/g;
      const result = {};
      let match;
      while ((match = pattern.exec(code)) !== null) {
        result[match[1]] = eval(`(${match[2]})`);
      }
      return result;
    },
  },
  {
    input: "market-details/market-details.js",
    output: "market-details.json",
    extract: (code) => {
      const m = code.match(/let marketDetails = (\{[\s\S]*?\n\});/);
      return m ? eval(`(${m[1]})`) : null;
    },
  },
  {
    input: "wealth-pattern-within-markets/wealth-pattern-within-markets.js",
    output: "wealth-pattern-within-markets.json",
    extract: (code) => {
      const m = code.match(
        /let wealthPatternWithinMarkets = (\{[\s\S]*?\n\});/
      );
      return m ? eval(`(${m[1]})`) : null;
    },
  },
  {
    input: "wealth-pattern-within-markets/deciles.js",
    output: "deciles.json",
    extract: (code) => {
      const m = code.match(/let deciles = (\{[\s\S]*?\n\});/);
      return m ? eval(`(${m[1]})`) : null;
    },
  },
  {
    input: "wealth-pattern-within-markets/gains-and-losses.js",
    output: "gains-and-losses.json",
    extract: (code) => {
      const m = code.match(/let gainsAndLosses = (\{[\s\S]*?\n\});/);
      return m ? eval(`(${m[1]})`) : null;
    },
  },
  {
    input: "sources/sources.js",
    output: "sources.json",
    extract: (code) => {
      const m = code.match(/let sources = (\{[\s\S]*?\n\});/);
      return m ? eval(`(${m[1]})`) : null;
    },
  },
];

// Also convert the home-data
conversions.push({
  input: null,
  inputPath: join(__dirname, "..", "js", "data", "home-data.js"),
  output: "home-data.json",
  extract: (code) => {
    const m = code.match(/let totalNetWealth = (\{[\s\S]*?\n\});/);
    return m ? eval(`(${m[1]})`) : null;
  },
});

mkdirSync(DATA_DIR, { recursive: true });

let successCount = 0;
let failCount = 0;

for (const conv of conversions) {
  const inputPath = conv.inputPath || join(TABULA_DIR, conv.input);
  const outputPath = join(DATA_DIR, conv.output);
  try {
    const code = readFileSync(inputPath, "utf-8");
    const data = conv.extract(code);
    if (data === null || data === undefined) {
      console.warn(`⚠ No data extracted from ${conv.input || conv.inputPath}`);
      failCount++;
      continue;
    }
    writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`✓ ${conv.output}`);
    successCount++;
  } catch (err) {
    console.error(`✗ ${conv.output}: ${err.message}`);
    failCount++;
  }
}

// Also try to convert remaining tabula files with simple patterns
const additionalFiles = [
  {
    input: "components-of-wealth/region-usd.js",
    output: "components-region-usd.json",
  },
  {
    input: "components-of-wealth/region-percentage.js",
    output: "components-region-percentage.json",
  },
  {
    input: "market-details/market-details-market.js",
    output: "market-details-market.json",
  },
  {
    input: "household-wealth-changes/changes-in-household-wealth.js",
    output: "household-wealth-changes.json",
  },
  {
    input: "wealth-pattern-within-markets/wealth-pattern-by-region.js",
    output: "wealth-pattern-by-region.json",
  },
  {
    input: "wealth-pattern-within-markets/membership-of-top-wealth-groups.js",
    output: "membership-of-top-wealth-groups.json",
  },
];

for (const file of additionalFiles) {
  const inputPath = join(TABULA_DIR, file.input);
  const outputPath = join(DATA_DIR, file.output);
  try {
    const code = readFileSync(inputPath, "utf-8");
    // Generic: extract all top-level let/var/const object/array assignments
    const pattern = /(?:let|var|const)\s+(\w+)\s*=\s*(\{[\s\S]*?\n\}|\[[\s\S]*?\n\]);/g;
    const result = {};
    let match;
    while ((match = pattern.exec(code)) !== null) {
      try {
        result[match[1]] = eval(`(${match[2]})`);
      } catch {}
    }
    if (Object.keys(result).length > 0) {
      writeFileSync(outputPath, JSON.stringify(result, null, 2));
      console.log(`✓ ${file.output}`);
      successCount++;
    } else {
      console.warn(`⚠ No data extracted from ${file.input}`);
      failCount++;
    }
  } catch (err) {
    console.error(`✗ ${file.output}: ${err.message}`);
    failCount++;
  }
}

console.log(`\nDone: ${successCount} succeeded, ${failCount} failed`);
