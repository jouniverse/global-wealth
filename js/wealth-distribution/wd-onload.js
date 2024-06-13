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
  init_introduction();
  init_components();
  init_market_details();
  init_wealth_estimates_by_region();
  init_wealth_estimates_by_country();
  init_wealth_estimates_by_single_country();
};
