/**
 * World Map — interactive choropleth powered by D3 + TopoJSON.
 */
import "../../styles/main.css";
import { initNavbar } from "../components/navbar.js";
import { initAgents } from "../canvas-sketch/agents.js";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import worldTopo from "world-atlas/countries-110m.json";
import marketDetails from "../../data/market-details.json";
import wealthPattern from "../../data/wealth-pattern-within-markets.json";
import wealthByCountry from "../../data/wealth-estimates-by-country.json";

initNavbar("world-map.html");
initAgents({ parent: document.body, opacity: 0.4 });

// ─── Constants ────────────────────────────────────────────────
const GOLD = "#E9C176";
const DARK = "#131313";
const MUTED = "#8A8A89";
const NO_DATA = "#1E1E1E";

// ─── Name Mapping (TopoJSON name → data market name) ─────────
const NAME_MAP = {
  "United States of America": "United States",
  "Dem. Rep. Congo": "Congo Dem. Rep.",
  "Dominican Rep.": "Dominican Rep.",
  "Central African Rep.": "Central African Rep.",
  "S. Sudan": "South Sudan",
  "Eq. Guinea": "Equatorial Guinea",
  "W. Sahara": "Western Sahara",
  "Solomon Is.": "Solomon Islands",
  "Côte d'Ivoire": "Cote d'Ivoire",
  "Bosnia and Herz.": "Bosnia and Herzegovina",
  "Czech Rep.": "Czechia",
  "Lao PDR": "Lao PDR",
  "eSwatini": "Eswatini",
  "Korea": "Korea",
  "Dem. Rep. Korea": "North Korea",
  "Macedonia": "Macedonia",
  "Taiwan": "Taiwan",
  "China": "Mainland China",
  "Russia": "Russia",
  "Iran": "Iran",
  "Syria": "Syria",
  "Venezuela": "Venezuela",
  "Egypt": "Egypt",
  "Yemen": "Yemen",
  "Congo": "Congo Rep.",
  "Brunei": "Brunei",
  "Slovakia": "Slovakia",
};

// ─── Lookup index for each data country ─────────────────────
function buildLookup(markets) {
  const lookup = {};
  markets.forEach((name, i) => {
    lookup[name.toLowerCase()] = i;
  });
  return lookup;
}

const detailLookup = buildLookup(marketDetails.market);
const patternLookup = buildLookup(
  wealthPattern.wealthPatternWithinMarketsCountry?.market ?? [],
);

function findIdx(name, lookup) {
  const mapped = NAME_MAP[name] ?? name;
  return lookup[mapped.toLowerCase()] ?? -1;
}

// ─── Metric Config ──────────────────────────────────────────
const METRICS = {
  wealthPerAdult_2022: {
    label: "Wealth per Adult",
    fmt: (v) => v != null ? `$${(v / 1000).toFixed(1)}K` : "No data",
    domain: [0, 50000, 100000, 200000, 400000, 800000],
    colors: ["#1a1510", "#3d2e1a", "#6b4e2a", "#9a7340", "#c5a059", "#E9C176"],
    scaleType: "threshold",
    data: (name) => {
      const i = findIdx(name, detailLookup);
      return i >= 0 ? marketDetails.wealthPerAdult_2022[i] : null;
    },
  },
  totalWealth_2022: {
    label: "Total Wealth",
    fmt: (v) => v != null ? (v >= 1e3 ? `$${(v / 1e3).toFixed(1)} Tn` : `$${v.toFixed(0)} Bn`) : "No data",
    domain: [1, 10, 100, 1000, 10000, 150000],
    colors: ["#1a1510", "#3d2e1a", "#6b4e2a", "#9a7340", "#c5a059", "#E9C176"],
    scaleType: "log",
    data: (name) => {
      const i = findIdx(name, detailLookup);
      return i >= 0 ? marketDetails.totalWealth_2022[i] : null;
    },
  },
  gdpPerAdult_2022: {
    label: "GDP per Adult",
    fmt: (v) => v != null ? `$${(v / 1000).toFixed(1)}K` : "No data",
    domain: [0, 5000, 15000, 30000, 60000, 120000],
    colors: ["#1a1510", "#3d2e1a", "#6b4e2a", "#9a7340", "#c5a059", "#E9C176"],
    scaleType: "threshold",
    data: (name) => {
      const i = findIdx(name, detailLookup);
      return i >= 0 ? marketDetails.gdpPerAdult_2022[i] : null;
    },
  },
};

// ─── Build Map ──────────────────────────────────────────────
let currentMetric = "wealthPerAdult_2022";
let selectedCountryFeature = null;

const allCountries = topojson.feature(worldTopo, worldTopo.objects.countries);
// Remove Antarctica (ISO 3166-1 numeric code 010) — no wealth data
const countries = {
  type: allCountries.type,
  features: allCountries.features.filter((f) => f.id !== "010" && f.properties.name !== "Antarctica"),
};

// ─── Populate mobile country dropdown ───────────────────────
function populateCountryDropdown() {
  const sel = document.getElementById("country-select");
  if (!sel) return;
  const names = countries.features
    .map((f) => NAME_MAP[f.properties.name] ?? f.properties.name)
    .sort();
  names.forEach((n) => {
    const opt = document.createElement("option");
    opt.value = n;
    opt.textContent = n;
    sel.appendChild(opt);
  });
  sel.addEventListener("change", (e) => {
    const name = e.target.value;
    if (!name) return;
    const feature = countries.features.find(
      (f) => (NAME_MAP[f.properties.name] ?? f.properties.name) === name
    );
    if (feature) {
      selectedCountryFeature = feature;
      render();
      showPanel(feature);
    }
  });
}

function render() {
  const el = document.getElementById("map");
  if (!el) return;
  el.innerHTML = "";

  const container = document.getElementById("map-container");
  const width = container.clientWidth || 960;
  // Fixed aspect ratio — height depends only on width, so it never changes
  const height = Math.max(Math.round(width * 0.5), 280);
  container.style.height = `${height}px`;

  const metric = METRICS[currentMetric];

  // Build color scale based on metric type
  let color;
  if (metric.scaleType === "log") {
    color = d3.scaleLog()
      .domain([metric.domain[0], metric.domain[metric.domain.length - 1]])
      .range([metric.colors[0], metric.colors[metric.colors.length - 1]])
      .interpolate(d3.interpolateHsl)
      .clamp(true);
  } else {
    color = d3.scaleThreshold().domain(metric.domain).range([NO_DATA, ...metric.colors]);
  }

  const projection = d3.geoNaturalEarth1()
    .fitSize([width, height - 40], countries);
  const path = d3.geoPath(projection);

  const svg = d3.select(el).append("svg")
    .attr("width", width).attr("height", height)
    .style("display", "block");

  // Country paths
  svg.selectAll("path")
    .data(countries.features)
    .join("path")
    .attr("d", path)
    .attr("fill", (d) => {
      const val = metric.data(d.properties.name);
      if (val == null || val <= 0) return NO_DATA;
      return color(val);
    })
    .attr("stroke", (d) =>
      selectedCountryFeature && d.properties.name === selectedCountryFeature.properties.name
        ? GOLD : DARK
    )
    .attr("stroke-width", (d) =>
      selectedCountryFeature && d.properties.name === selectedCountryFeature.properties.name
        ? 2 : 0.5
    )
    .style("cursor", "pointer")
    .on("mouseenter", function (event, d) {
      d3.select(this).attr("stroke", GOLD).attr("stroke-width", 1.5);
      showTooltip(event, d, metric);
    })
    .on("mousemove", (event) => moveTooltip(event))
    .on("mouseleave", function (event, d) {
      const isSelected = selectedCountryFeature && d.properties.name === selectedCountryFeature.properties.name;
      d3.select(this)
        .attr("stroke", isSelected ? GOLD : DARK)
        .attr("stroke-width", isSelected ? 2 : 0.5);
      hideTooltip();
    })
    .on("click", (event, d) => {
      selectedCountryFeature = d;
      render(); // re-render to update highlights
      showPanel(d);
    });

  // Draw legend in the external div
  drawLegend(color, metric);
}

// ─── Legend ─────────────────────────────────────────────────
function drawLegend(color, metric) {
  const legendContainer = document.getElementById("map-legend");
  if (!legendContainer) return;
  legendContainer.innerHTML = "";

  const legendWidth = Math.min(300, window.innerWidth * 0.6);
  const legendHeight = 10;
  const totalW = legendWidth + 60;
  const totalH = 36;
  const steps = metric.domain;

  const svg = d3.select(legendContainer).append("svg")
    .attr("width", totalW).attr("height", totalH);
  const lg = svg.append("g").attr("transform", `translate(30,4)`);

  if (metric.scaleType === "log") {
    // Continuous gradient legend for log scale
    const xScale = d3.scaleLog().domain([steps[0], steps[steps.length - 1]]).range([0, legendWidth]).clamp(true);
    const numSwatches = 60;
    const swatchWidth = legendWidth / numSwatches;
    for (let i = 0; i < numSwatches; i++) {
      const val = xScale.invert(i * swatchWidth);
      lg.append("rect")
        .attr("x", i * swatchWidth).attr("y", 0)
        .attr("width", swatchWidth + 0.5).attr("height", legendHeight)
        .attr("fill", color(val));
    }
    const tickVals = [1, 10, 100, 1000, 10000, 100000];
    lg.append("g").attr("transform", `translate(0,${legendHeight})`)
      .call(d3.axisBottom(xScale).tickValues(tickVals.filter((v) => v <= steps[steps.length - 1])).tickSize(4)
        .tickFormat((d) => d >= 1e3 ? `$${d / 1e3}Tn` : `$${d}Bn`))
      .call((g) => g.select(".domain").remove())
      .selectAll("text").attr("fill", MUTED).style("font-size", "9px");
  } else {
    // Threshold legend
    const xScale = d3.scaleLinear().domain([steps[0], steps[steps.length - 1]]).range([0, legendWidth]);
    steps.forEach((s, i) => {
      if (i === steps.length - 1) return;
      lg.append("rect")
        .attr("x", xScale(s)).attr("y", 0)
        .attr("width", xScale(steps[i + 1]) - xScale(s))
        .attr("height", legendHeight)
        .attr("fill", metric.colors[i]);
    });
    lg.append("g").attr("transform", `translate(0,${legendHeight})`)
      .call(d3.axisBottom(xScale).tickValues(steps).tickSize(4)
        .tickFormat((d) => d >= 1e6 ? `${d / 1e6}M` : d >= 1e3 ? `${d / 1e3}K` : d))
      .call((g) => g.select(".domain").remove())
      .selectAll("text").attr("fill", MUTED).style("font-size", "9px");
  }
}

// ─── Tooltip ────────────────────────────────────────────────
const tooltip = document.getElementById("map-tooltip");
const tooltipName = document.getElementById("tooltip-name");
const tooltipValue = document.getElementById("tooltip-value");
const tooltipExtra = document.getElementById("tooltip-extra");

function showTooltip(event, d, metric) {
  const name = d.properties.name;
  const val = metric.data(name);
  tooltipName.textContent = NAME_MAP[name] ?? name;
  tooltipValue.textContent = `${metric.label}: ${metric.fmt(val)}`;

  // Extra info
  const pi = findIdx(name, patternLookup);
  const pData = wealthPattern.wealthPatternWithinMarketsCountry;
  if (pi >= 0 && pData) {
    const gini = pData.gini?.[pi];
    tooltipExtra.textContent = gini != null ? `Gini: ${(gini * 100).toFixed(1)}` : "";
  } else {
    tooltipExtra.textContent = "";
  }

  tooltip.classList.remove("opacity-0");
  tooltip.classList.add("opacity-100");
  moveTooltip(event);
}

function moveTooltip(event) {
  const rect = tooltip.getBoundingClientRect();
  let left = event.clientX + 14;
  let top = event.clientY + 14;
  if (left + rect.width > window.innerWidth - 8) left = event.clientX - rect.width - 8;
  if (top + rect.height > window.innerHeight - 8) top = event.clientY - rect.height - 8;
  if (left < 8) left = 8;
  if (top < 8) top = 8;
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function hideTooltip() {
  tooltip.classList.remove("opacity-100");
  tooltip.classList.add("opacity-0");
}

// ─── Country Time Series Lookup ─────────────────────────────
function getCountryTimeSeries(countryName) {
  const series = [];
  for (const yearEntry of wealthByCountry) {
    if (!yearEntry.country) continue;
    const idx = yearEntry.country.indexOf(countryName);
    if (idx >= 0 && yearEntry.totalWealth?.[idx] != null) {
      series.push({ year: yearEntry.year, value: yearEntry.totalWealth[idx] });
    }
  }
  return series.sort((a, b) => a.year - b.year);
}

// ─── Detail Panel ───────────────────────────────────────────
const panel = document.getElementById("country-panel");
const panelName = document.getElementById("panel-country-name");
const panelStats = document.getElementById("panel-stats");
const panelClose = document.getElementById("panel-close");

panelClose?.addEventListener("click", () => {
  panel?.classList.add("hidden");
  selectedCountryFeature = null;
  render(); // remove highlight
});

function showPanel(d) {
  const name = d.properties.name;
  const displayName = NAME_MAP[name] ?? name;
  const di = findIdx(name, detailLookup);
  const pi = findIdx(name, patternLookup);

  panelName.textContent = displayName;

  // Stats section — compact grid of stat items
  let stats = [];
  if (di >= 0) {
    stats.push({ label: "Region", value: marketDetails.region[di] ?? "—" });
    stats.push({ label: "Wealth/Adult '22", value: METRICS.wealthPerAdult_2022.fmt(marketDetails.wealthPerAdult_2022[di]) });
    stats.push({ label: "Wealth/Adult '00", value: METRICS.wealthPerAdult_2022.fmt(marketDetails.wealthPerAdult_2000[di]) });
    stats.push({ label: "Total Wealth", value: METRICS.totalWealth_2022.fmt(marketDetails.totalWealth_2022[di]) });
    stats.push({ label: "GDP/Adult", value: METRICS.gdpPerAdult_2022.fmt(marketDetails.gdpPerAdult_2022[di]) });
    stats.push({ label: "World Share", value: marketDetails.shareOfWorldWealth_2022[di] != null ? `${marketDetails.shareOfWorldWealth_2022[di].toFixed(2)}%` : "—" });
  }
  if (pi >= 0) {
    const pData = wealthPattern.wealthPatternWithinMarketsCountry;
    const gini = pData.gini?.[pi];
    const mean = pData.mean_wealth_per_adult_usd?.[pi];
    const median = pData.median_wealth_per_adult_usd?.[pi];
    if (gini != null) stats.push({ label: "Gini", value: (gini * 100).toFixed(1) });
    if (mean != null) stats.push({ label: "Mean Wealth", value: `$${(mean / 1000).toFixed(1)}K` });
    if (median != null) stats.push({ label: "Median Wealth", value: `$${(median / 1000).toFixed(1)}K` });
  }

  if (stats.length === 0) {
    panelStats.innerHTML = `<p class="text-on-surface-variant">No data available.</p>`;
  } else {
    panelStats.innerHTML = `<div class="grid grid-cols-2 md:grid-cols-3 gap-2">
      ${stats.map((s) => `<div class="bg-surface/40 rounded-lg px-3 py-2">
        <p class="text-on-surface-variant text-xs">${s.label}</p>
        <p class="text-on-surface text-sm font-medium">${s.value}</p>
      </div>`).join("")}
    </div>`;
  }

  // Time series chart — stacked below stats, with interactive tooltip
  const panelChart = document.getElementById("panel-chart");
  panelChart.innerHTML = "";

  const ts = getCountryTimeSeries(displayName);
  if (ts.length > 1) {
    panelChart.innerHTML = `<p class="label-md text-on-surface-variant mb-2">Total Wealth 2000–2022 (USD Bn)</p>`;
    const chartDiv = document.createElement("div");
    chartDiv.style.height = "280px";
    chartDiv.style.width = "100%";
    panelChart.appendChild(chartDiv);

    requestAnimationFrame(() => {
      const sw = chartDiv.clientWidth;
      const sh = 280;
      const m = { top: 8, right: 16, bottom: 22, left: 50 };
      const w = sw - m.left - m.right;
      const h = sh - m.top - m.bottom;

      const svg = d3.select(chartDiv).append("svg")
        .attr("width", sw).attr("height", sh)
        .append("g").attr("transform", `translate(${m.left},${m.top})`);

      const xS = d3.scaleLinear().domain(d3.extent(ts, (d) => d.year)).range([0, w]);
      const yS = d3.scaleLinear().domain([0, d3.max(ts, (d) => d.value) * 1.1]).range([h, 0]);

      // Area fill
      const area = d3.area()
        .x((d) => xS(d.year)).y0(h).y1((d) => yS(d.value)).curve(d3.curveMonotoneX);
      svg.append("path").datum(ts).attr("d", area).attr("fill", GOLD).attr("opacity", 0.15);

      // Line
      svg.append("path").datum(ts)
        .attr("d", d3.line().x((d) => xS(d.year)).y((d) => yS(d.value)).curve(d3.curveMonotoneX))
        .attr("fill", "none").attr("stroke", GOLD).attr("stroke-width", 2);

      // Dots at endpoints
      [ts[0], ts[ts.length - 1]].forEach((pt) => {
        svg.append("circle").attr("cx", xS(pt.year)).attr("cy", yS(pt.value))
          .attr("r", 3).attr("fill", GOLD);
      });

      // Interactive tooltip overlay
      const focusDot = svg.append("circle").attr("r", 4).attr("fill", GOLD).attr("opacity", 0).style("pointer-events", "none");
      const bisect = d3.bisector((d) => d.year).left;

      // Ensure map tooltip is available for reuse
      const ttip = document.getElementById("map-tooltip");
      const ttName = document.getElementById("tooltip-name");
      const ttValue = document.getElementById("tooltip-value");
      const ttExtra = document.getElementById("tooltip-extra");

      svg.append("rect").attr("width", w).attr("height", h).attr("fill", "transparent")
        .on("mousemove", (event) => {
          const [mx] = d3.pointer(event, svg.node());
          const yr = xS.invert(mx);
          const idx = bisect(ts, yr, 1);
          const d0 = ts[idx - 1];
          const d1 = ts[idx];
          const pt = d1 && (yr - d0.year > d1.year - yr) ? d1 : d0;
          if (pt) {
            focusDot.attr("cx", xS(pt.year)).attr("cy", yS(pt.value)).attr("opacity", 1);
            const fmtVal = pt.value >= 1e3 ? `$${(pt.value / 1e3).toFixed(1)} Tn` : `$${pt.value.toFixed(0)} Bn`;
            ttName.textContent = displayName;
            ttValue.textContent = `${pt.year}: ${fmtVal}`;
            ttExtra.textContent = "";
            ttip.classList.remove("opacity-0");
            ttip.classList.add("opacity-100");
            moveTooltip(event);
          }
        })
        .on("mouseleave", () => {
          focusDot.attr("opacity", 0);
          hideTooltip();
        });

      svg.append("g").attr("transform", `translate(0,${h})`)
        .call(d3.axisBottom(xS).ticks(5).tickFormat(d3.format("d")))
        .call((g) => g.select(".domain").attr("stroke", "#333"))
        .selectAll("text").attr("fill", MUTED).style("font-size", "10px");

      svg.append("g")
        .call(d3.axisLeft(yS).ticks(4).tickFormat((d) => d >= 1e3 ? `${(d / 1e3).toFixed(0)}T` : d))
        .call((g) => g.select(".domain").remove())
        .call((g) => g.selectAll(".tick line").attr("stroke", "#333").attr("x2", w).attr("stroke-dasharray", "2,3"))
        .selectAll("text").attr("fill", MUTED).style("font-size", "10px");
    });
  } else {
    panelChart.innerHTML = `<p class="body-md text-on-surface-variant">No time series data available.</p>`;
  }

  panel?.classList.remove("hidden");
}

// ─── Metric Switch ──────────────────────────────────────────
document.getElementById("metric-select")?.addEventListener("change", (e) => {
  currentMetric = e.target.value;
  render();
});

// ─── Init & Resize ──────────────────────────────────────────
function init() {
  populateCountryDropdown();
  render();
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 200);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  requestAnimationFrame(init);
}
