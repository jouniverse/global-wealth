// Create mobile restriction overlay
function createMobileRestriction() {
  const mobileRestriction = document.createElement("div");
  mobileRestriction.classList.add("mobile-restriction");
  mobileRestriction.innerHTML = `
    <h1>Desktop Only</h1>
    <p>This application is optimized for desktop viewing only. Please access this site on a device with a screen width of at least 1050px for the best experience.</p>
  `;
  document.body.appendChild(mobileRestriction);

  // Check screen size on resize
  window.addEventListener("resize", checkScreenSize);

  // Initial check
  checkScreenSize();
}

// Check screen size function
function checkScreenSize() {
  const mobileRestriction = document.querySelector(".mobile-restriction");
  if (window.innerWidth < 1050) {
    mobileRestriction.style.display = "flex";
  } else {
    mobileRestriction.style.display = "none";
  }
}

window.onload = function () {
  createMobileRestriction();
  init_hnwi_region();
  init_hnwi_country();
  init_hnwi_deciles();
  init_gains_and_losses();
  init_wealth_pattern();
};

document.addEventListener("DOMContentLoaded", function () {
  const headers = [
    "#intro",
    "#private-wealth-header",
    "#hnwi-region-header",
    "#hnwi-country-header",
    "#deciles-header",
    "#gains-and-losses-header",
    "#wealth-pattern-within-markets-header",
  ];

  headers.forEach((headerId) => {
    const header = document.querySelector(headerId);
    if (!header) return; // Skip if the header doesn't exist

    const details = header.nextElementSibling;
    if (details && details.tagName.toLowerCase() === "details") {
      let nextHeader = details.nextElementSibling;

      // Find the next header element
      while (nextHeader && !headers.includes("#" + nextHeader.id)) {
        nextHeader = nextHeader.nextElementSibling;
      }

      if (nextHeader && headers.includes("#" + nextHeader.id)) {
        details.addEventListener("toggle", () => {
          if (details.open) {
            nextHeader.style.marginTop = "160px";
          } else {
            nextHeader.style.marginTop = "30px";
          }
        });
      }
    }
  });
});
