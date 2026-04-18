/**
 * Wealth Distribution page — combined view with multiple chart sections.
 */
import "../../styles/main.css";
import { initNavbar } from "../components/navbar.js";
import { initFooter } from "../components/footer.js";
import { initAgents } from "../canvas-sketch/agents.js";
import * as d3 from "d3";

// Data imports
import distribution from "../../data/distribution.json";
import hnwiRegion from "../../data/hnwi-region.json";
import gainsAndLosses from "../../data/gains-and-losses.json";
import wealthPattern from "../../data/wealth-pattern-within-markets.json";
import deciles from "../../data/deciles.json";
import wealthByRegion from "../../data/wealth-estimates-by-region.json";
import householdChanges from "../../data/household-wealth-changes.json";

initNavbar("wealth-distribution.html");
initFooter();
initAgents({ parent: document.body, opacity: 0.3 });

const GOLD = "#E9C176";
const GOLD_DIM = "rgba(233, 193, 118, 0.6)";
const MUTED = "#8A8A89";
const GRID = "#1E1E1E";

// Distinct palette for lines & stacked charts
const LINE_COLORS = [
  "#E9C176", "#6EC6CA", "#E07A5F", "#81B29A",
  "#F2CC8F", "#3D405B", "#A8DADC", "#9B8B6F",
];
const BRACKET_COLORS = ["#E9C176", "#C5A059", "#A67D3D", "#6B5B42"];

const main = document.getElementById("main-content");

// Shared tooltip
let tooltipEl;
function ensureTooltip() {
  if (tooltipEl) return;
  tooltipEl = document.createElement("div");
  tooltipEl.className = "chart-tooltip opacity-0 transition-opacity duration-150";
  tooltipEl.style.position = "fixed";
  tooltipEl.style.pointerEvents = "none";
  tooltipEl.style.zIndex = "50";
  document.body.appendChild(tooltipEl);
}
function showTip(event, html) {
  ensureTooltip();
  tooltipEl.innerHTML = html;
  tooltipEl.classList.remove("opacity-0");
  tooltipEl.classList.add("opacity-100");
  const rect = tooltipEl.getBoundingClientRect();
  let left = event.clientX + 14;
  let top = event.clientY + 14;
  if (left + rect.width > window.innerWidth - 8) left = event.clientX - rect.width - 8;
  if (top + rect.height > window.innerHeight - 8) top = event.clientY - rect.height - 8;
  if (left < 8) left = 8;
  if (top < 8) top = 8;
  tooltipEl.style.left = `${left}px`;
  tooltipEl.style.top = `${top}px`;
}
function hideTip() {
  if (!tooltipEl) return;
  tooltipEl.classList.remove("opacity-100");
  tooltipEl.classList.add("opacity-0");
}

function buildPage() {
  main.innerHTML = `
    <section class="px-3 md:px-6 py-8 md:py-20">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-14">
          <p class="label-md text-primary mb-3">Analysis</p>
          <h1 class="display-md text-on-surface mb-4">Wealth Distribution</h1>
          <p class="body-lg text-on-surface-variant max-w-2xl mx-auto">
            Explore the distribution of global wealth across regions and countries — from broad patterns to high-net-worth concentrations.
          </p>
        </div>

        <!-- Section Nav -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          <button class="tab-btn active" data-section="distribution">Wealth Pyramid</button>
          <button class="tab-btn" data-section="timeline">Regional Trends</button>
          <button class="tab-btn" data-section="hnwi">HNWI</button>
          <button class="tab-btn" data-section="changes">Gains & Losses</button>
          <button class="tab-btn" data-section="inequality">Inequality</button>
        </div>

        <!-- Chart Sections -->
        <div id="section-container"></div>
      </div>
    </section>
  `;

  const tabs = main.querySelectorAll(".tab-btn");
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      renderSection(btn.dataset.section);
    });
  });

  renderSection("distribution");
}

// ─── Section Router ───────────────────────────────────────────
function renderSection(id) {
  const container = document.getElementById("section-container");
  container.innerHTML = "";
  switch (id) {
    case "distribution": renderDistribution(container); break;
    case "timeline": renderTimeline(container); break;
    case "hnwi": renderHNWI(container); break;
    case "changes": renderChanges(container); break;
    case "inequality": renderInequality(container); break;
  }
}

// ─── Utility: number formatter ──────────────────────────────
function fmtNum(d) {
  if (d >= 1e6) return `${(d / 1e6).toFixed(1)}M`;
  if (d >= 1e3) return `${(d / 1e3).toFixed(0)}K`;
  return d;
}

// ─── 1. Wealth Pyramid — Stacked bar by region ───────────────
function renderDistribution(container) {
  const data = distribution.distributionOfWealthByRegionPct;
  const brackets = ["wealth_under_10k", "wealth_10k_to_100k", "wealth_100k_to_1m", "wealth_over_1m"];
  const bracketLabels = ["< $10K", "$10K–100K", "$100K–1M", "> $1M"];

  container.innerHTML = `
    <div class="glass-panel p-3 md:p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 class="headline-md text-on-surface">Wealth Distribution by Region</h2>
          <p class="body-md text-on-surface-variant mt-1">Share of adults in each wealth bracket (%)</p>
        </div>
        <div class="flex gap-3 mt-3 md:mt-0 flex-wrap">
          ${bracketLabels.map((l, i) => `
            <span class="flex items-center gap-1.5 body-md text-on-surface-variant">
              <span class="w-3 h-3 rounded-sm inline-block" style="background: ${BRACKET_COLORS[i]};"></span>
              ${l}
            </span>
          `).join("")}
        </div>
      </div>
      <div id="chart-distribution" style="height: 400px;"></div>
    </div>
  `;

  requestAnimationFrame(() => {
    const el = document.getElementById("chart-distribution");
    if (!el) return;

    const isMobile = el.clientWidth < 500;
    const margin = { top: 10, right: 20, bottom: 50, left: isMobile ? 90 : 140 };
    const width = el.clientWidth - margin.left - margin.right;
    const height = el.clientHeight - margin.top - margin.bottom;

    const markets = data.market.filter((m) => m !== "World");

    const svg = d3.select(el).append("svg")
      .attr("width", "100%").attr("height", "100%")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleBand().domain(markets).range([0, height]).padding(0.25);
    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);

    const stack = markets.map((m) => {
      const idx = data.market.indexOf(m);
      return { market: m, values: brackets.map((b) => data[b]?.[idx] ?? 0) };
    });

    stack.forEach((d) => {
      let cumulative = 0;
      d.values.forEach((v, i) => {
        svg.append("rect")
          .attr("x", x(cumulative))
          .attr("y", y(d.market))
          .attr("width", x(v))
          .attr("height", y.bandwidth())
          .attr("fill", BRACKET_COLORS[i])
          .attr("rx", 2)
          .attr("opacity", 0.85)
          .on("mouseenter", (event) => showTip(event, `
            <p class="label-md text-primary">${d.market}</p>
            <p class="body-md text-on-surface">${bracketLabels[i]}: ${v.toFixed(1)}%</p>
          `))
          .on("mousemove", (event) => showTip(event, `
            <p class="label-md text-primary">${d.market}</p>
            <p class="body-md text-on-surface">${bracketLabels[i]}: ${v.toFixed(1)}%</p>
          `))
          .on("mouseleave", hideTip);
        cumulative += v;
      });
    });

    svg.append("g").call(d3.axisLeft(y).tickSize(0))
      .call((g) => g.select(".domain").remove())
      .selectAll("text").attr("fill", MUTED).style("font-size", "11px").style("font-family", "Inter");

    svg.append("g").attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat((d) => `${d}%`))
      .call((g) => g.select(".domain").attr("stroke", GRID))
      .selectAll("text").attr("fill", MUTED).style("font-size", "10px");
  });
}

// ─── 2. Regional Trends — Time series ────────────────────────
function renderTimeline(container) {
  const regions = [...new Set(wealthByRegion[0]?.Market || [])].filter((m) => m !== "World");

  container.innerHTML = `
    <div class="glass-panel p-3 md:p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 class="headline-md text-on-surface">Regional Wealth Over Time</h2>
          <p class="body-md text-on-surface-variant mt-1">Total wealth by region, 2000–2022</p>
        </div>
        <select id="timeline-metric" class="select-styled mt-3 md:mt-0">
          <option value="totalWealth">Total Wealth (USD Bn)</option>
          <option value="wealthPerAdult">Wealth per Adult (USD)</option>
          <option value="medianWealthPerAdult">Median Wealth (USD)</option>
        </select>
      </div>
      <div id="chart-timeline" style="height: 400px;"></div>
      <div id="timeline-legend" class="flex flex-wrap gap-4 mt-4 justify-center"></div>
    </div>
  `;

  function draw(metric) {
    const el = document.getElementById("chart-timeline");
    el.innerHTML = "";
    const legendEl = document.getElementById("timeline-legend");
    legendEl.innerHTML = "";

    const isMobile = el.clientWidth < 500;
    const margin = { top: 10, right: 20, bottom: 30, left: isMobile ? 40 : 70 };
    const width = el.clientWidth - margin.left - margin.right;
    const height = el.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(el).append("svg")
      .attr("width", "100%").attr("height", "100%")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const series = regions.map((region, ri) => {
      const points = wealthByRegion.map((entry) => {
        const idx = entry.Market?.indexOf(region);
        const val = idx >= 0 ? entry[metric]?.[idx] : null;
        return val != null ? { year: entry.year, value: val } : null;
      }).filter(Boolean);
      return { region, points, color: LINE_COLORS[ri % LINE_COLORS.length] };
    }).filter((s) => s.points.length > 0);

    const allPoints = series.flatMap((s) => s.points);
    const x = d3.scaleLinear().domain(d3.extent(allPoints, (d) => d.year)).range([0, width]);
    const y = d3.scaleLinear().domain([0, d3.max(allPoints, (d) => d.value) * 1.1]).range([height, 0]);

    const line = d3.line().x((d) => x(d.year)).y((d) => y(d.value)).curve(d3.curveMonotoneX);

    // Draw lines with hover
    series.forEach((s) => {
      svg.append("path").datum(s.points)
        .attr("d", line).attr("fill", "none").attr("stroke", s.color).attr("stroke-width", 2).attr("opacity", 0.8);

      // Invisible wider path for hover
      svg.append("path").datum(s.points)
        .attr("d", line).attr("fill", "none").attr("stroke", "transparent").attr("stroke-width", 12)
        .style("cursor", "pointer")
        .on("mouseenter", (event) => showTip(event, `<p class="label-md" style="color:${s.color}">${s.region}</p>`))
        .on("mousemove", (event) => {
          const [mx] = d3.pointer(event, svg.node());
          const yr = Math.round(x.invert(mx));
          const pt = s.points.find((p) => p.year === yr);
          showTip(event, `
            <p class="label-md" style="color:${s.color}">${s.region}</p>
            <p class="body-md text-on-surface">${yr}: ${fmtNum(pt?.value ?? 0)}</p>
          `);
        })
        .on("mouseleave", hideTip);
    });

    svg.append("g").attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format("d")))
      .call((g) => g.select(".domain").attr("stroke", GRID))
      .selectAll("text").attr("fill", MUTED).style("font-size", "10px");

    svg.append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat(fmtNum))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").attr("stroke", GRID).attr("x2", width).attr("stroke-dasharray", "2,3"))
      .selectAll("text").attr("fill", MUTED).style("font-size", "10px");

    series.forEach((s) => {
      legendEl.innerHTML += `
        <span class="flex items-center gap-1.5 body-md text-on-surface-variant">
          <span class="w-3 h-3 rounded-sm inline-block" style="background: ${s.color};"></span>
          ${s.region}
        </span>
      `;
    });
  }

  requestAnimationFrame(() => draw("totalWealth"));
  document.getElementById("timeline-metric")?.addEventListener("change", (e) => draw(e.target.value));
}

// ─── 3. HNWI by Region ──────────────────────────────────────
function renderHNWI(container) {
  const brackets = ["wealth_1_5m", "wealth_5_10m", "wealth_10_50m", "wealth_50_100m", "wealth_100_500m", "wealth_500_plus"];
  const bracketLabels = ["$1–5M", "$5–10M", "$10–50M", "$50–100M", "$100–500M", "$500M+"];
  const hnwiColors = ["#E9C176", "#C5A059", "#A67D3D", "#d4a574", "#8B7355", "#6B5B42"];

  container.innerHTML = `
    <div class="glass-panel p-3 md:p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 class="headline-md text-on-surface">High-Net-Worth Individuals by Region</h2>
          <p class="body-md text-on-surface-variant mt-1">Number of adults in each wealth bracket</p>
        </div>
        <select id="hnwi-unit" class="select-styled mt-3 md:mt-0">
          <option value="usd">Absolute (count)</option>
          <option value="pct">Percentage of world</option>
        </select>
      </div>
      <div class="flex gap-3 mb-4 flex-wrap">
        ${bracketLabels.map((l, i) => `
          <span class="flex items-center gap-1.5 body-md text-on-surface-variant">
            <span class="w-3 h-3 rounded-sm inline-block" style="background: ${hnwiColors[i]};"></span>
            ${l}
          </span>
        `).join("")}
      </div>
      <div id="chart-hnwi" style="height: 420px;"></div>
    </div>
  `;

  function draw(unit) {
    const el = document.getElementById("chart-hnwi");
    el.innerHTML = "";
    const data = hnwiRegion[unit];
    if (!data) return;

    const markets = data.market.filter((m) => m !== "World");
    const isMobile = el.clientWidth < 500;
    const margin = { top: 10, right: 20, bottom: 50, left: isMobile ? 90 : 140 };
    const width = el.clientWidth - margin.left - margin.right;
    const height = el.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(el).append("svg")
      .attr("width", "100%").attr("height", "100%")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const rows = markets.map((m) => {
      const idx = data.market.indexOf(m);
      const total = brackets.reduce((sum, b) => sum + (data[b]?.[idx] ?? 0), 0);
      return { market: m, idx, total };
    }).sort((a, b) => b.total - a.total);

    const y = d3.scaleBand().domain(rows.map((r) => r.market)).range([0, height]).padding(0.25);
    const maxVal = d3.max(rows, (r) => r.total);
    const x = d3.scaleLinear().domain([0, maxVal]).range([0, width]);

    rows.forEach((r) => {
      let cumulative = 0;
      brackets.forEach((b, i) => {
        const v = data[b]?.[r.idx] ?? 0;
        svg.append("rect")
          .attr("x", x(cumulative)).attr("y", y(r.market))
          .attr("width", Math.max(0, x(cumulative + v) - x(cumulative))).attr("height", y.bandwidth())
          .attr("fill", hnwiColors[i]).attr("rx", 2).attr("opacity", 0.85)
          .on("mouseenter", (event) => showTip(event, `
            <p class="label-md text-primary">${r.market}</p>
            <p class="body-md text-on-surface">${bracketLabels[i]}: ${unit === "pct" ? v.toFixed(1) + "%" : fmtNum(v)}</p>
          `))
          .on("mousemove", (event) => showTip(event, `
            <p class="label-md text-primary">${r.market}</p>
            <p class="body-md text-on-surface">${bracketLabels[i]}: ${unit === "pct" ? v.toFixed(1) + "%" : fmtNum(v)}</p>
          `))
          .on("mouseleave", hideTip);
        cumulative += v;
      });
    });

    svg.append("g").call(d3.axisLeft(y).tickSize(0))
      .call((g) => g.select(".domain").remove())
      .selectAll("text").attr("fill", MUTED).style("font-size", "11px").style("font-family", "Inter");

    const fmt = unit === "pct" ? (d) => `${d}%` : fmtNum;
    svg.append("g").attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(fmt))
      .call((g) => g.select(".domain").attr("stroke", GRID))
      .selectAll("text").attr("fill", MUTED).style("font-size", "10px");
  }

  requestAnimationFrame(() => draw("usd"));
  document.getElementById("hnwi-unit")?.addEventListener("change", (e) => draw(e.target.value));
}

// ─── 4. Gains & Losses ──────────────────────────────────────
function renderChanges(container) {
  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
      <div class="glass-panel p-3 md:p-6">
        <h2 class="headline-md text-on-surface mb-2">Household Wealth Changes</h2>
        <p class="body-md text-on-surface-variant mb-4">Top gainers & losers, total change in USD Bn</p>
        <div id="chart-hh-changes" style="height: 400px;"></div>
      </div>
      <div class="glass-panel p-3 md:p-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 class="headline-md text-on-surface">HNWI Gains & Losses</h2>
            <p class="body-md text-on-surface-variant mt-1">Change in millionaire count, 2021 vs 2022</p>
          </div>
          <select id="gl-tier" class="select-styled mt-3 md:mt-0">
            <option value="wealthAbove1m">Wealth > $1M</option>
            <option value="globalTop10">Top 10%</option>
            <option value="globalTop1">Top 1%</option>
          </select>
        </div>
        <div id="chart-gains-losses" style="height: 400px;"></div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    drawHouseholdChanges();
    drawGainsLosses("wealthAbove1m");
  });
  document.getElementById("gl-tier")?.addEventListener("change", (e) => drawGainsLosses(e.target.value));
}

function drawDivergingBar(el, items, fmtVal) {
  if (!el) return;
  const isMobile = el.clientWidth < 500;
  const margin = { top: 10, right: 20, bottom: 30, left: isMobile ? 70 : 100 };
  const width = el.clientWidth - margin.left - margin.right;
  const height = el.clientHeight - margin.top - margin.bottom;

  const svg = d3.select(el).append("svg")
    .attr("width", "100%").attr("height", "100%")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const y = d3.scaleBand().domain(items.map((d) => d.country)).range([0, height]).padding(0.2);

  // Use actual data extent rather than symmetric — avoids huge empty space
  const minChange = d3.min(items, (d) => d.change);
  const maxChange = d3.max(items, (d) => d.change);
  const domainMin = Math.min(minChange, 0);
  const domainMax = Math.max(maxChange, 0);
  // Add 5% padding
  const pad = (domainMax - domainMin) * 0.05;
  const x = d3.scaleLinear().domain([domainMin - pad, domainMax + pad]).range([0, width]);

  svg.selectAll("rect").data(items).join("rect")
    .attr("x", (d) => d.change >= 0 ? x(0) : x(d.change))
    .attr("y", (d) => y(d.country))
    .attr("width", (d) => Math.abs(x(d.change) - x(0)))
    .attr("height", y.bandwidth())
    .attr("fill", (d) => d.change >= 0 ? GOLD : "#8B5E3C")
    .attr("rx", 2).attr("opacity", 0.85)
    .on("mouseenter", (event, d) => showTip(event, `
      <p class="label-md text-primary">${d.country}</p>
      <p class="body-md text-on-surface">Change: ${fmtVal(d.change)}</p>
    `))
    .on("mousemove", (event, d) => showTip(event, `
      <p class="label-md text-primary">${d.country}</p>
      <p class="body-md text-on-surface">Change: ${fmtVal(d.change)}</p>
    `))
    .on("mouseleave", hideTip);

  svg.append("g").call(d3.axisLeft(y).tickSize(0))
    .call((g) => g.select(".domain").remove())
    .selectAll("text").attr("fill", MUTED).style("font-size", "10px").style("font-family", "Inter");

  svg.append("line").attr("x1", x(0)).attr("x2", x(0)).attr("y1", 0).attr("y2", height)
    .attr("stroke", MUTED).attr("stroke-width", 1).attr("stroke-dasharray", "3,3");
}

function drawHouseholdChanges() {
  const el = document.getElementById("chart-hh-changes");
  if (!el) return;
  const data = householdChanges.changesInHouseholdWealthUSD;
  if (!data) return;

  const items = data.country.map((c, i) => ({
    country: c, change: data.totalChangeUSD[i],
  })).sort((a, b) => b.change - a.change);

  const top10 = items.slice(0, 10);
  const bottom10 = items.slice(-10).reverse();
  drawDivergingBar(el, [...top10, ...bottom10], (v) => `$${v.toFixed(0)} Bn`);
}

function drawGainsLosses(tier) {
  const el = document.getElementById("chart-gains-losses");
  if (!el) return;
  el.innerHTML = "";

  const gains = gainsAndLosses[`${tier}Gains`];
  const losses = gainsAndLosses[`${tier}Losses`];
  if (!gains || !losses) return;

  const changeKey = Object.keys(gains).find((k) => k.includes("change")) || "change";
  const items = [];
  gains.market.forEach((m, i) => items.push({ country: m, change: gains[changeKey]?.[i] ?? 0 }));
  losses.market.forEach((m, i) => items.push({ country: m, change: -(losses[changeKey]?.[i] ?? 0) }));
  items.sort((a, b) => b.change - a.change);

  drawDivergingBar(el, items, (v) => fmtNum(Math.abs(v)));
}

// ─── 5. Inequality — Deciles & Wealth Pattern ───────────────
function renderInequality(container) {
  const regionData = wealthPattern.wealthPatternWithinMarketsRegion;

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
      <div class="glass-panel p-3 md:p-6">
        <h2 class="headline-md text-on-surface mb-2">Wealth Deciles</h2>
        <p class="body-md text-on-surface-variant mb-4">Share of wealth held by each decile (World)</p>
        <div id="chart-deciles" style="height: 350px;"></div>
      </div>
      <div class="glass-panel p-3 md:p-6">
        <h2 class="headline-md text-on-surface mb-2">Mean vs Median Wealth</h2>
        <p class="body-md text-on-surface-variant mb-4">Scatter plot by region — gap indicates inequality</p>
        <div id="chart-scatter" style="height: 350px;"></div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    drawDeciles();
    drawScatter(regionData);
  });
}

function drawDeciles() {
  const el = document.getElementById("chart-deciles");
  if (!el) return;
  const data = deciles.decilesWorld;
  if (!data) return;

  const shareIdx = 1; // Index 1 = "Wealth share (%)"
  const threshIdx = 0; // Index 0 = "Minimum Wealth per Decile (USD per Adult)"
  const keys = ["decile_1", "decile_2", "decile_3", "decile_4", "decile_5",
    "decile_6", "decile_7", "decile_8", "decile_9", "top_10"];
  const labels = ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "Top 10%"];

  const values = keys.map((k) => {
    const v = data[k]?.[shareIdx];
    return typeof v === "number" ? v : 0;
  });
  const thresholds = keys.map((k) => {
    const v = data[k]?.[threshIdx];
    return typeof v === "number" ? v : null;
  });

  const margin = { top: 10, right: 20, bottom: 50, left: 55 };
  const width = el.clientWidth - margin.left - margin.right;
  const height = el.clientHeight - margin.top - margin.bottom;

  const svg = d3.select(el).append("svg")
    .attr("width", "100%").attr("height", "100%")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand().domain(labels).range([0, width]).padding(0.3);
  const y = d3.scaleLinear().domain([d3.min(values, (d) => Math.min(d, 0)), d3.max(values) * 1.1]).range([height, 0]);

  svg.selectAll("rect").data(values).join("rect")
    .attr("x", (_, i) => x(labels[i]))
    .attr("y", (d) => d >= 0 ? y(d) : y(0))
    .attr("width", x.bandwidth())
    .attr("height", (d) => Math.abs(y(d) - y(0)))
    .attr("fill", (_, i) => i === 9 ? GOLD : GOLD_DIM)
    .attr("rx", 3)
    .on("mouseenter", (event, d) => {
      const i = values.indexOf(d);
      const thresh = thresholds[i];
      showTip(event, `
        <p class="label-md text-primary">${labels[i]}</p>
        <p class="body-md text-on-surface">Wealth share: ${d.toFixed(1)}%</p>
        ${thresh != null ? `<p class="body-md text-on-surface-variant">Min wealth: $${fmtNum(thresh)}</p>` : ""}
      `);
    })
    .on("mousemove", (event, d) => {
      const i = values.indexOf(d);
      const thresh = thresholds[i];
      showTip(event, `
        <p class="label-md text-primary">${labels[i]}</p>
        <p class="body-md text-on-surface">Wealth share: ${d.toFixed(1)}%</p>
        ${thresh != null ? `<p class="body-md text-on-surface-variant">Min wealth: $${fmtNum(thresh)}</p>` : ""}
      `);
    })
    .on("mouseleave", hideTip);

  // X axis
  svg.append("g").attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickSize(0))
    .call((g) => g.select(".domain").attr("stroke", GRID))
    .selectAll("text").attr("fill", MUTED).style("font-size", "10px");

  // X axis label
  svg.append("text").attr("x", width / 2).attr("y", height + 40)
    .attr("text-anchor", "middle").attr("fill", MUTED).style("font-size", "11px").text("Wealth Decile");

  // Y axis
  svg.append("g").call(d3.axisLeft(y).ticks(5).tickFormat((d) => `${d}%`))
    .call((g) => g.select(".domain").remove())
    .call((g) => g.selectAll(".tick line").attr("stroke", GRID).attr("x2", width).attr("stroke-dasharray", "2,3"))
    .selectAll("text").attr("fill", MUTED).style("font-size", "10px");

  // Y axis label
  svg.append("text").attr("transform", "rotate(-90)").attr("x", -height / 2).attr("y", -40)
    .attr("text-anchor", "middle").attr("fill", MUTED).style("font-size", "11px").text("Share of Total Wealth (%)");
}

function drawScatter(regionData) {
  const el = document.getElementById("chart-scatter");
  if (!el || !regionData) return;

  const markets = regionData.market || [];
  // Skip index 0 which is a header row ("Regional data")
  const items = markets.slice(1).map((m, rawI) => {
    const i = rawI + 1;
    return {
      market: m,
      mean: regionData.mean_wealth_per_adult_usd?.[i] ?? 0,
      median: regionData.median_wealth_per_adult_usd?.[i] ?? 0,
    };
  }).filter((d) => typeof d.mean === "number" && d.mean > 0 && typeof d.median === "number" && d.median > 0);

  if (items.length === 0) return;

  const margin = { top: 10, right: 20, bottom: 50, left: 65 };
  const width = el.clientWidth - margin.left - margin.right;
  const height = el.clientHeight - margin.top - margin.bottom;

  const svg = d3.select(el).append("svg")
    .attr("width", "100%").attr("height", "100%")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const minMean = d3.min(items, (d) => d.mean);
  const minMedian = d3.min(items, (d) => d.median);
  const x = d3.scaleSymlog().constant(1000)
    .domain([0, d3.max(items, (d) => d.mean) * 1.15]).range([0, width]);
  const y = d3.scaleSymlog().constant(1000)
    .domain([0, d3.max(items, (d) => d.median) * 1.15]).range([height, 0]);

  // Diagonal line (mean = median)
  const maxVal = Math.min(x.domain()[1], y.domain()[1]);
  svg.append("line").attr("x1", x(0)).attr("y1", y(0)).attr("x2", x(maxVal)).attr("y2", y(maxVal))
    .attr("stroke", MUTED).attr("stroke-width", 1).attr("stroke-dasharray", "4,4").attr("opacity", 0.4);

  svg.selectAll("circle").data(items).join("circle")
    .attr("cx", (d) => x(d.mean)).attr("cy", (d) => y(d.median))
    .attr("r", 7).attr("fill", GOLD).attr("opacity", 0.7)
    .attr("stroke", GOLD).attr("stroke-width", 1)
    .on("mouseenter", (event, d) => showTip(event, `
      <p class="label-md text-primary">${d.market}</p>
      <p class="body-md text-on-surface">Mean: $${fmtNum(d.mean)}</p>
      <p class="body-md text-on-surface">Median: $${fmtNum(d.median)}</p>
      <p class="body-md text-on-surface-variant">Ratio: ${(d.mean / d.median).toFixed(1)}x</p>
    `))
    .on("mousemove", (event, d) => showTip(event, `
      <p class="label-md text-primary">${d.market}</p>
      <p class="body-md text-on-surface">Mean: $${fmtNum(d.mean)}</p>
      <p class="body-md text-on-surface">Median: $${fmtNum(d.median)}</p>
      <p class="body-md text-on-surface-variant">Ratio: ${(d.mean / d.median).toFixed(1)}x</p>
    `))
    .on("mouseleave", hideTip);

  const isMobileScatter = el.clientWidth < 500;

  // Labels — position dynamically to avoid clipping
  svg.selectAll(".dot-label").data(items).join("text")
    .attr("class", "dot-label")
    .attr("x", (d) => {
      // If dot is in the right 10% of chart, place label to the left
      if (x(d.mean) > width * 0.9) return x(d.mean) - 10;
      return x(d.mean) + 10;
    })
    .attr("y", (d) => y(d.median) + 4)
    .attr("text-anchor", (d) => x(d.mean) > width * 0.9 ? "end" : "start")
    .attr("fill", MUTED).style("font-size", isMobileScatter ? "8px" : "10px").style("font-family", "Inter")
    .text((d) => d.market);

  // Axes — use specific tick values to avoid crowding at top end
  const xTickValues = isMobileScatter ? [0, 100000, 600000] : [0, 100000, 200000, 400000, 600000];
  svg.append("g").attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickValues(xTickValues).tickFormat((d) => `$${fmtNum(d)}`))
    .call((g) => g.select(".domain").attr("stroke", GRID))
    .selectAll("text").attr("fill", MUTED).style("font-size", "10px");

  svg.append("g")
    .call(d3.axisLeft(y).ticks(5).tickFormat((d) => `$${fmtNum(d)}`))
    .call((g) => g.select(".domain").remove())
    .call((g) => g.selectAll(".tick line").attr("stroke", GRID).attr("x2", width).attr("stroke-dasharray", "2,3"))
    .selectAll("text").attr("fill", MUTED).style("font-size", "10px");

  // Axis labels
  svg.append("text").attr("x", width / 2).attr("y", height + 40)
    .attr("text-anchor", "middle").attr("fill", MUTED).style("font-size", "11px").text("Mean Wealth (USD)");
  svg.append("text").attr("transform", "rotate(-90)").attr("x", -height / 2).attr("y", -50)
    .attr("text-anchor", "middle").attr("fill", MUTED).style("font-size", "11px").text("Median Wealth (USD)");
}

// Init
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", buildPage);
} else {
  requestAnimationFrame(buildPage);
}
