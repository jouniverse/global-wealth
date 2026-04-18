/**
 * About page entry point
 */
import "../../styles/main.css";
import { initNavbar } from "../components/navbar.js";
import { initFooter } from "../components/footer.js";
import { initAgents } from "../canvas-sketch/agents.js";
import sources from "../../data/sources.json";

initNavbar("about.html");
initFooter();
initAgents({ parent: document.body, opacity: 0.35 });

// ─── Coverage Stats ──────────────────────────────────────────
const coverageEl = document.getElementById("coverage-stats");
if (coverageEl && sources.coverage) {
  const labels = ["Tier 1", "Tier 2", "Tier 3", "Tier 4"];
  const c = sources.coverage;
  for (let i = 0; i < c.number.length; i++) {
    const card = document.createElement("div");
    card.className = "glass-panel p-3";
    card.innerHTML = `
      <p class="label-md text-on-surface-variant mb-1">${labels[i]} — ${c.number[i]} markets</p>
      <p class="body-md text-on-surface">${c.cumulatedPctOfPopulation[i]}% of population</p>
      <p class="body-md text-on-surface-variant">${c.cumulatedPctOfTotalWealth[i]}% of total wealth</p>
    `;
    coverageEl.appendChild(card);
  }
}

// ─── Collapsible Source Sections ─────────────────────────────
const container = document.getElementById("sources-container");
if (container) {
  // Household Data Sources
  if (sources.householdDataSources) {
    const hds = sources.householdDataSources;
    addCollapsibleTable(container, "Household Data Sources", hds.market, [
      { key: "financial_data", label: "Financial Data" },
      { key: "non_financial_data", label: "Non-Financial Data" },
      { key: "financial_and_non_financial_data_compiled_by", label: "Compiled By" },
      { key: "link_to_open_acces_data", label: "Open Access Link", isLink: true },
    ], hds);
  }

  // Survey Data Sources
  if (sources.surveyDataSources) {
    const sds = sources.surveyDataSources;
    addCollapsibleTable(container, "Survey Data Sources", sds.market, [
      { key: "year", label: "Year" },
      { key: "source", label: "Survey Name" },
    ], sds);
  }
}

function addCollapsibleTable(parent, title, markets, columns, data) {
  const section = document.createElement("details");
  section.className = "glass-panel overflow-hidden";

  const summary = document.createElement("summary");
  summary.className = "px-5 py-4 cursor-pointer select-none flex items-center justify-between label-md text-on-surface hover:text-primary transition-colors";
  summary.innerHTML = `
    <span>${title} <span class="text-on-surface-variant font-normal">(${markets.length} entries)</span></span>
    <svg class="details-arrow w-4 h-4 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>
  `;
  section.appendChild(summary);

  const content = document.createElement("div");
  content.className = "px-5 pb-5 overflow-x-auto";

  const table = document.createElement("table");
  table.className = "w-full text-left body-md";
  table.style.borderCollapse = "collapse";

  // Header
  const thead = document.createElement("thead");
  let headerRow = "<tr>";
  headerRow += `<th class="py-2 pr-4 text-on-surface-variant label-md border-b border-outline-variant/20">Market</th>`;
  for (const col of columns) {
    headerRow += `<th class="py-2 pr-4 text-on-surface-variant label-md border-b border-outline-variant/20">${col.label}</th>`;
  }
  headerRow += "</tr>";
  thead.innerHTML = headerRow;
  table.appendChild(thead);

  // Body
  const tbody = document.createElement("tbody");
  for (let i = 0; i < markets.length; i++) {
    let row = `<tr class="border-b border-outline-variant/10">`;
    row += `<td class="py-2 pr-4 text-on-surface whitespace-nowrap">${markets[i]}</td>`;
    for (const col of columns) {
      const val = data[col.key]?.[i] ?? "—";
      if (col.isLink && typeof val === "string" && val.includes("href")) {
        // Render link HTML as-is (sanitize by extracting href/text)
        const links = [...val.matchAll(/href="([^"]+)"[^>]*>([^<]+)/g)];
        const rendered = links.map(([, url, text]) =>
          `<a href="${url}" target="_blank" rel="noopener" class="text-primary hover:underline">${text}</a>`
        ).join("; ") || "n.a.";
        row += `<td class="py-2 pr-4 text-on-surface-variant">${rendered}</td>`;
      } else {
        const clean = typeof val === "string" ? val.replace(/<[^>]*>/g, "").trim() : val;
        row += `<td class="py-2 pr-4 text-on-surface-variant">${clean || "n.a."}</td>`;
      }
    }
    row += "</tr>";
    tbody.innerHTML += row;
  }
  table.appendChild(tbody);
  content.appendChild(table);
  section.appendChild(content);
  parent.appendChild(section);
}
