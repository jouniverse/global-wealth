function addSourcesHTML(sourcesName, sourcesTitle) {
  let section = document.getElementById("sources-section");
  section.innerHTML += `<details id="sources-info-${sourcesName}">
  <summary id="sources-summary-${sourcesName}">${sourcesTitle}</summary>
  <div id="table-container-${sourcesName}">
    <table id="data-table-${sourcesName}"></table>
  </div>
</details>`;
}

function createTableRow(dataSources, sourcesName, sourcesTitle, headers) {
  let detailsElement = document.getElementById(`sources-info-${sourcesName}`);
  let summaryElement = document.getElementById(
    `sources-summary-${sourcesName}`
  );
  let tableContainer = document.getElementById(
    `table-container-${sourcesName}`
  );
  let dataTable = document.getElementById(`data-table-${sourcesName}`);
  let categories = Object.keys(dataSources);

  let tableHeaders = headers.map((category) => `<th>${category}</th>`).join("");
  let headerRow = `<tr>${tableHeaders}</tr>`;

  let tableRows = dataSources[Object.keys(dataSources)[0]]
    .map((_, index) => {
      let rowData = categories
        .map((category) => `<td>${dataSources[category][index]}</td>`)
        .join("");
      return `<tr>${rowData}</tr>`;
    })
    .join("");

  return `${headerRow}${tableRows}`;
}

function updateTableContainer(dataSources, sourcesName, sourcesTitle, headers) {
  let dataTable = document.getElementById(`data-table-${sourcesName}`);
  let content = createTableRow(dataSources, sourcesName, sourcesTitle, headers);
  dataTable.innerHTML = content;
}

addSourcesHTML("household-data-sources", "Household Data Sources");
updateTableContainer(
  householdDataSources,
  "household-data-sources",
  "Household Data Sources",
  [
    "Market",
    "Financial data",
    "Non-financial data",
    "Financial and non-financial data compiled by",
    "Link to open access data",
  ]
);

addSourcesHTML("survey-data-sources", "Survey Data Sources");
updateTableContainer(
  surveyDataSources,
  "survey-data-sources",
  "Survey Data Sources",
  ["Market", "Year", "Source"]
);

// market: [...],
// financial_data: [...],
// non_financial_data: [...],
// financial_and_non_financial_data_compiled_by: [...],
// link_to_open_acces_data: [...]
