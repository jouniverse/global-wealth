function setBg() {
  if (!detectMobile()) {
    document.body.style.backgroundImage = `url('../../img/gold-bg/gold-21-long.jpg`;
  } else if (detectMobile() && window.innerWidth < 768) {
    document.body.style.backgroundImage = `url('../../img/gold-bg/gold-8-long.jpg`;
  } else {
    document.body.style.backgroundImage = `url('../../img/gold-bg/gold-21-long.jpg`;
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
