/**
 * Math helpers for canvas-sketch agents animation
 */
export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function mapRange(value, inputMin, inputMax, outputMin, outputMax) {
  const EPSILON = Number.EPSILON;
  if (Math.abs(inputMin - inputMax) < EPSILON) return outputMin;
  return (
    ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
    outputMin
  );
}
