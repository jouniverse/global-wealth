function setBg() {
  if (!detectMobile()) {
    document.body.style.backgroundImage = `url('../../img/gold-bg/gold-21-repeat.jpg`;
  } else if (detectMobile() && window.innerWidth < 768) {
    document.body.style.backgroundImage = `url('../../img/gold-bg/gold-8-repeat.jpg`;
  } else {
    document.body.style.backgroundImage = `url('../../img/gold-bg/gold-21-repeat.jpg`;
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
