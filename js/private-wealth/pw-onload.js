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
  init_hnwi_region();
  init_hnwi_country();
  init_hnwi_deciles();
  init_gains_and_losses();
  init_wealth_pattern();
};
