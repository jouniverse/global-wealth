function setBg() {
  let largeImage = new Image();
  largeImage.src = "./img/gold-bg/gold-21-repeat.jpg";
  let largeImageMobile = new Image();
  largeImageMobile.src = "./img/gold-bg/gold-8-repeat.jpg";

  if (!detectMobile()) {
    largeImage.onload = function () {
      document.body.style.backgroundImage = `url('./img/gold-bg/gold-21-repeat.jpg')`;
    };
  } else if (detectMobile() && window.innerWidth < 768) {
    largeImageMobile.onload = function () {
      document.body.style.backgroundImage = `url('./img/gold-bg/gold-8-repeat.jpg')`;
    };
  } else {
    largeImage.onload = function () {
      document.body.style.backgroundImage = `url('./img/gold-bg/gold-21-repeat.jpg')`;
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
