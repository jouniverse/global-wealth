function setBg() {
  let largeImage = new Image();
  largeImage.src = "./img/agents_imgs/agents-1.png";
  let largeImageMobile = new Image();
  largeImageMobile.src = "./img/agents_imgs/agents-1.png";

  if (!detectMobile()) {
    largeImage.onload = function () {
      document.body.style.backgroundImage = `url('./img/agents_imgs/agents-1.png')`;
    };
  } else if (detectMobile() && window.innerWidth < 768) {
    largeImageMobile.onload = function () {
      document.body.style.backgroundImage = `url('./img/agents_imgs/agents-1.png')`;
    };
  } else {
    largeImage.onload = function () {
      document.body.style.backgroundImage = `url('./img/agents_imgs/agents-1.png')`;
    };
  }
}

window.onload = function () {
  setBg();
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
