/**
 * Home page – overview with KPI cards and charts.
 */
import "../../styles/main.css";
import { initNavbar } from "../components/navbar.js";
import { initFooter } from "../components/footer.js";
import { initAgents } from "../canvas-sketch/agents.js";
import * as d3 from "d3";
import wealthByRegion from "../../data/wealth-estimates-by-region.json";

initNavbar("home.html");
initFooter();

// Particle animation background (subtle behind content)
initAgents({ parent: document.body, opacity: 0.4 });

/**
 * Data shape: each entry has { year, Market: [...], Adults: [...], totalWealth: [...], ... }
 * Market array usually ends with "World" as the last element.
 */

function getMarketIndex(entry, name) {
  return entry.Market?.indexOf(name) ?? -1;
}

function getMarketValue(entry, field, marketName) {
  const idx = getMarketIndex(entry, marketName);
  return idx >= 0 ? entry[field]?.[idx] : null;
}

const format = (v) => {
  if (v == null) return "—";
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(0)}K`;
  return v.toLocaleString();
};

// Shared tooltip for Home charts
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

function init() {
  // Find 2022 data for KPIs
  const year2022 = wealthByRegion.find((d) => d.year === 2022) || wealthByRegion[wealthByRegion.length - 1];

  if (year2022) {
    const totalWealth = getMarketValue(year2022, "totalWealth", "World");
    const perAdult = getMarketValue(year2022, "wealthPerAdult", "World");
    const median = getMarketValue(year2022, "medianWealthPerAdult", "World");
    const adults = getMarketValue(year2022, "Adults", "World");

    document.getElementById("kpi-total-value").textContent = totalWealth
      ? `$${(totalWealth / 1000).toFixed(0)}`
      : "—";
    document.getElementById("kpi-adult-value").textContent = perAdult
      ? `$${format(perAdult)}`
      : "—";
    document.getElementById("kpi-median-value").textContent = median
      ? `$${format(median)}`
      : "—";
    document.getElementById("kpi-adults-value").textContent = adults
      ? format(adults)
      : "—";

    // Regional bar chart — all markets except "World"
    const regions = [];
    if (year2022.Market) {
      for (let i = 0; i < year2022.Market.length; i++) {
        if (year2022.Market[i] !== "World" && year2022.totalWealth?.[i]) {
          regions.push({ label: year2022.Market[i], value: year2022.totalWealth[i] });
        }
      }
    }

    if (regions.length > 0) {
      renderBarChart("#chart-regional-wealth", regions);
    }
  }

  // Timeline chart — World total wealth over all years
  const timelineData = wealthByRegion
    .map((entry) => {
      const value = getMarketValue(entry, "totalWealth", "World");
      return value != null ? { year: entry.year, value } : null;
    })
    .filter(Boolean);

  if (timelineData.length > 0) {
    renderLineChart("#chart-wealth-timeline", timelineData);
  }
}

// Defer to ensure layout is complete so chart containers have dimensions
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  requestAnimationFrame(init);
}

// ─── Chart renderers ──────────────────────────────────────────

function renderBarChart(selector, data) {
  const container = document.querySelector(selector);
  if (!container) return;

  const isMobile = container.clientWidth < 500;
  const margin = { top: 8, right: 16, bottom: 40, left: isMobile ? 80 : 120 };
  const width = container.clientWidth - margin.left - margin.right;
  const height = container.clientHeight - margin.top - margin.bottom;

  const sorted = [...data].sort((a, b) => b.value - a.value);

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([0, d3.max(sorted, (d) => d.value)]).range([0, width]);
  const y = d3.scaleBand().domain(sorted.map((d) => d.label)).range([0, height]).padding(0.3);

  // Bars
  svg
    .selectAll("rect")
    .data(sorted)
    .join("rect")
    .attr("x", 0)
    .attr("y", (d) => y(d.label))
    .attr("width", (d) => x(d.value))
    .attr("height", y.bandwidth())
    .attr("fill", "#E9C176")
    .attr("rx", 3)
    .attr("opacity", 0.85)
    .on("mouseenter", (event, d) => showTip(event, `
      <p class="label-md text-primary">${d.label}</p>
      <p class="body-md text-on-surface">$${(d.value / 1000).toFixed(1)} Tn</p>
    `))
    .on("mousemove", (event, d) => showTip(event, `
      <p class="label-md text-primary">${d.label}</p>
      <p class="body-md text-on-surface">$${(d.value / 1000).toFixed(1)} Tn</p>
    `))
    .on("mouseleave", hideTip);

  // Y axis
  svg
    .append("g")
    .call(d3.axisLeft(y).tickSize(0))
    .call((g) => g.select(".domain").remove())
    .selectAll("text")
    .attr("fill", "#8A8A89")
    .style("font-size", "11px")
    .style("font-family", "Inter, sans-serif");

  // Value labels
  svg
    .selectAll(".val-label")
    .data(sorted)
    .join("text")
    .attr("class", "val-label")
    .attr("x", (d) => x(d.value) + 6)
    .attr("y", (d) => y(d.label) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("fill", "#8A8A89")
    .style("font-size", "10px")
    .style("font-family", "Inter, sans-serif")
    .text((d) => `${(d.value / 1000).toFixed(0)}T`);
}

function renderLineChart(selector, data) {
  const container = document.querySelector(selector);
  if (!container) return;

  const isMobileLine = container.clientWidth < 500;
  const margin = { top: 8, right: 20, bottom: 30, left: isMobileLine ? 40 : 60 };
  const width = container.clientWidth - margin.left - margin.right;
  const height = container.clientHeight - margin.top - margin.bottom;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain(d3.extent(data, (d) => d.year)).range([0, width]);
  const y = d3.scaleLinear().domain([0, d3.max(data, (d) => d.value) * 1.1]).range([height, 0]);

  // Area
  const area = d3
    .area()
    .x((d) => x(d.year))
    .y0(height)
    .y1((d) => y(d.value))
    .curve(d3.curveMonotoneX);

  const gradient = svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "area-gradient")
    .attr("x1", "0")
    .attr("x2", "0")
    .attr("y1", "0")
    .attr("y2", "1");

  gradient.append("stop").attr("offset", "0%").attr("stop-color", "#E9C176").attr("stop-opacity", 0.3);
  gradient.append("stop").attr("offset", "100%").attr("stop-color", "#E9C176").attr("stop-opacity", 0.02);

  svg.append("path").datum(data).attr("d", area).attr("fill", "url(#area-gradient)");

  // Line
  const line = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d.value))
    .curve(d3.curveMonotoneX);

  svg.append("path").datum(data).attr("d", line).attr("fill", "none").attr("stroke", "#E9C176").attr("stroke-width", 2);

  // Tooltip overlay for line chart
  const bisect = d3.bisector((d) => d.year).left;
  svg.append("rect")
    .attr("width", width).attr("height", height)
    .attr("fill", "transparent")
    .on("mousemove", (event) => {
      const [mx] = d3.pointer(event, svg.node());
      const yr = x.invert(mx);
      const idx = bisect(data, yr, 1);
      const d0 = data[idx - 1];
      const d1 = data[idx];
      const d = d1 && (yr - d0.year > d1.year - yr) ? d1 : d0;
      if (d) {
        showTip(event, `
          <p class="label-md text-primary">${d.year}</p>
          <p class="body-md text-on-surface">$${(d.value / 1000).toFixed(1)} Tn</p>
        `);
      }
    })
    .on("mouseleave", hideTip);

  // Axes
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format("d")))
    .call((g) => g.select(".domain").attr("stroke", "#353534"))
    .selectAll("text")
    .attr("fill", "#8A8A89")
    .style("font-size", "10px");

  svg
    .append("g")
    .call(d3.axisLeft(y).ticks(5).tickFormat((d) => `${(d / 1000).toFixed(0)}T`))
    .call((g) => g.select(".domain").remove())
    .call((g) => g.selectAll(".tick line").attr("stroke", "#1E1E1E").attr("x2", width).attr("stroke-dasharray", "2,3"))
    .selectAll("text")
    .attr("fill", "#8A8A89")
    .style("font-size", "10px");
}
