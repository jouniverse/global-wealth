function addDoubleSlider(
  data,
  sliderData,
  nameOfDoubleSlider,
  year = false,
  callback
) {
  let sliderOne;
  let sliderTwo;
  let displayValOne;
  let displayValTwo;
  let minGap;
  let sliderTrack;
  let sliderMaxValue;

  let minOne;
  let minTwo;
  let maxOne;
  let maxTwo;
  let lengthOfData;
  let valOne;
  let valTwo;
  let sliderOneValue;
  let sliderTwoValue;

  sliderOne = document.getElementById(`slider-1-${nameOfDoubleSlider}`);
  sliderTwo = document.getElementById(`slider-2-${nameOfDoubleSlider}`);
  displayValOne = document.getElementById(`range-1-${nameOfDoubleSlider}`);
  displayValTwo = document.getElementById(`range-2-${nameOfDoubleSlider}`);
  // gap: 0 or 1 ?
  minGap = 1;
  sliderTrack = document.querySelector(`.slider-track-${nameOfDoubleSlider}`);
  sliderMaxValue = document.getElementById(
    `slider-1-${nameOfDoubleSlider}`
  ).max;

  minOne = sliderOne.min = Math.min(...data.x);
  minTwo = sliderTwo.min = Math.min(...data.x);
  maxOne = sliderOne.max = Math.max(...data.x);
  maxTwo = sliderTwo.max = Math.max(...data.x);
  lengthOfData = data.x.length;
  valOne = 0;
  valTwo = lengthOfData - 1;
  sliderOne.value = valOne;
  sliderTwo.value = valTwo;

  if (displayValOne.textContent == "" && displayValTwo.textContent == "") {
    if (year) {
      displayValOne.textContent = data.y[sliderOne.value];
      displayValOne.textContent = `Years: ${data.y[sliderOne.value]}`;
      displayValTwo.textContent = data.y[sliderTwo.value];
    } else {
      displayValOne.textContent = "Top " + data.y[sliderOne.value];
      displayValTwo.textContent = "Bottom: " + data.y[sliderTwo.value];
    }
  }

  // fillColor();

  sliderOne.oninput = function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    if (year) {
      displayValOne.textContent = `Years: ${data.y[sliderOne.value]}`;
    }

    // fillColor();
    if (typeof callback === "function") {
      callback(sliderOne.value, sliderTwo.value);
    }
  };

  sliderTwo.oninput = function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    if (year) {
      displayValTwo.textContent = data.y[sliderTwo.value];
    }
    // fillColor();
    if (typeof callback === "function") {
      callback(sliderOne.value, sliderTwo.value);
    }
  };

  // deprecate fillColor()
  // function fillColor() {
  //   let percent1 = (sliderOne.value / maxOne) * 100;
  //   let percent2 = (sliderTwo.value / maxTwo) * 100;
  //   // SLIDER TRACK STYLE (COLOR) BETWEEN THE THUMBS
  //   // sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #195973 ${percent1}% , #195973 ${percent2}%, #dadae5 ${percent2}%)`;
  //   sliderTrack.style.background = `linear-gradient(to right, white ${percent1}% , #343a40ff ${percent1}% , #6c757dff ${percent2}%, white ${percent2}%)`;
  // }
}
