function addSlider(sliderName, callback) {
  let slider = document.getElementById(`year-slider-${sliderName}`);
  let displayVal = document.getElementById(`year-range-${sliderName}`);
  let sliderValue = slider.value;
  displayVal.textContent = `Year: ${slider.value}`;
  fillColor();

  slider.oninput = function slide() {
    displayVal.textContent = `Year: ${slider.value}`;
    fillColor();
    if (typeof callback === "function") {
      callback(slider.value);
    }
  };

  function fillColor() {
    // Note: years slider
    let percent = ((slider.value - 2000) / 22) * 100;
    slider.style.background = `linear-gradient(to right, #d7871a ${percent}%, #f8f9fa 100%)`;
  }
}
