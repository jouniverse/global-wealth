// function setBg() {
//   let largeImage = new Image();
//   largeImage.src = "./img/agents_imgs/agents-1.png";
//   let largeImageMobile = new Image();
//   largeImageMobile.src = "./img/agents_imgs/agents-1.png";

//   if (!detectMobile()) {
//     largeImage.onload = function () {
//       document.body.style.backgroundImage = `url('./img/agents_imgs/agents-1.png')`;
//     };
//   } else if (detectMobile() && window.innerWidth < 768) {
//     largeImageMobile.onload = function () {
//       document.body.style.backgroundImage = `url('./img/agents_imgs/agents-1.png')`;
//     };
//   } else {
//     largeImage.onload = function () {
//       document.body.style.backgroundImage = `url('./img/agents_imgs/agents-1.png')`;
//     };
//   }
// }

window.onload = function () {
  // setBg();
  init_introduction();
  init_components();
  init_market_details();
  init_wealth_estimates_by_region();
  init_wealth_estimates_by_country();
  init_wealth_estimates_by_single_country();
};

document.addEventListener("DOMContentLoaded", function () {
  const headers = [
    "#intro",
    "#total-wealth-header",
    "#components-of-wealth-header",
    "#market-details-header",
    "#wealth-estimates-main-header",
    "#wealth-estimates-by-region-header",
    "#wealth-estimates-by-country-header",
    "#wealth-estimates-by-single-country-header",
  ];

  headers.forEach((headerId) => {
    const header = document.querySelector(headerId);
    if (!header) return; // Skip if the header doesn't exist

    const details = header.nextElementSibling;
    if (details && details.tagName.toLowerCase() === "details") {
      const nextHeader = details.nextElementSibling;

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
