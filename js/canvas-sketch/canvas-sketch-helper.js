var EPSILON = Number.EPSILON;

function rangeFloor(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (typeof min !== "number" || typeof max !== "number") {
    throw new TypeError("Expected all arguments to be numbers");
  }

  return Math.floor(randomRange(min, max));
}

function pick(array) {
  if (array.length === 0) return undefined;
  return array[rangeFloor(0, array.length)];
}

// Turn dergees into radians
const degToRad = (degrees) => {
  return (degrees / 180) * Math.PI;
};

function mapRange(value, inputMin, inputMax, outputMin, outputMax, clamp) {
  // Reference:
  // https://openframeworks.cc/documentation/math/ofMath/
  if (Math.abs(inputMin - inputMax) < EPSILON) {
    return outputMin;
  } else {
    var outVal =
      ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
      outputMin;
    if (clamp) {
      if (outputMax < outputMin) {
        if (outVal < outputMax) outVal = outputMax;
        else if (outVal > outputMin) outVal = outputMin;
      } else {
        if (outVal > outputMax) outVal = outputMax;
        else if (outVal < outputMin) outVal = outputMin;
      }
    }
    return outVal;
  }
}

// A function for calculating random numbers from a certain range
const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};
