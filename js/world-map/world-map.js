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
  console.log("SVG is interactive!");

  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  document.body.appendChild(tooltip);

  document.querySelectorAll(".world-map-svg path").forEach((path) => {
    path.addEventListener("mouseover", (event) => {
      const countryName = path.getAttribute("title");

      console.log(`Hovered over: ${countryName}`); // Debugging

      if (!countryName || !countries.includes(countryName)) return;

      const idx = countries.indexOf(countryName);
      const wealth2021 = year_2021.totalWealth[idx] || "N/A";
      const wealth2022 = year_2022.totalWealth[idx] || "N/A";
      const percentChange =
        wealth2021 !== "N/A" && wealth2022 !== "N/A"
          ? (((wealth2022 - wealth2021) / wealth2021) * 100).toFixed(2) + "%"
          : "N/A";

      tooltip.innerHTML = `
            <strong>${countryName}</strong><br>
            Wealth 2021: $${wealth2021}B<br>
            Wealth 2022: $${wealth2022}B<br>
            Change: ${percentChange}
        `;
      tooltip.style.display = "block";
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;

      path.style.fill = colorsHEX.platinum; // Highlight effect
    });

    path.addEventListener("mousemove", (event) => {
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;
    });

    path.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
      path.style.fill = ""; // Reset color
    });
  });
};

// Initialize when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  createMobileRestriction();
});
