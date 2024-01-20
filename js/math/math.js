// a function that returns the sum of items in an array
function sum(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// a function that return the difference array of items in an array
function difference(arr) {
  const difference = arr.map((value, idx) => {
    return value - arr[idx - 1];
  });
  return difference.slice(2, difference.length);
}

// a function that returns the percent change from the previous value of an array
function percentChange(arr) {
  const percentChange = arr.map((value, idx) => {
    return ((value - arr[idx - 1]) / arr[idx - 1]) * 100;
  });
  return percentChange.slice(1, percentChange.length);
}

// a function that rounds a number to a given precision (number of decimal places)
function roundTo(number, precision) {
  return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
}

// a function that returns "n.a" if the number is NaN or if the number is Infinite otherwise it returns the number
function naIfNaN(number) {
  return isNaN(number) || number === Infinity || number === -Infinity
    ? "n.a"
    : number;
}

// a function that returns the max of an array
function max(arr) {
  return Math.max(...arr);
}

// a function that returns the min of an array
function min(arr) {
  return Math.min(...arr);
}

// a function that returns the mean of an array
function mean(arr) {
  return sum(arr) / arr.length;
}

// a function that returns the median of an array
function median(arr) {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

// a function that returns the mode of an array
function mode(arr) {
  const mode = arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();
  return mode;
}

// a function that returns the range of an array
function range(arr) {
  const sortedArr = arr.sort((a, b) => a - b);
  const range = sortedArr[sortedArr.length - 1] - sortedArr[0];
  return range;
}

// a function that returns the standard deviation of an array
function standardDeviation(arr) {
  const meanOfArr = mean(arr);
  const squareDiffs = arr.map((value) => {
    const diff = value - meanOfArr;
    const sqrDiff = diff * diff;
    return sqrDiff;
  });
  const avgSquareDiff = mean(squareDiffs);
  const stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

// a function that returns the variance of an array
function variance(arr) {
  const stdDev = standardDeviation(arr);
  return stdDev * stdDev;
}

// a function that returns the z-score of an array
function zScore(arr) {
  const meanOfArr = mean(arr);
  const stdDev = standardDeviation(arr);
  const zScore = arr.map((value) => {
    return (value - meanOfArr) / stdDev;
  });
  return zScore;
}

// a function that returns the percentile of an array
function percentile(arr) {
  const sortedArr = arr.sort((a, b) => a - b);
  const percentile = sortedArr.map((value) => {
    return (value / sortedArr.length) * 100;
  });
  return percentile;
}

// a function that returns the quartile of an array
function quartile(arr) {
  const sortedArr = arr.sort((a, b) => a - b);
  const quartile = sortedArr.map((value) => {
    return (value / sortedArr.length) * 4;
  });
  return quartile;
}

// a function that returns the interquartile range of an array
function interquartileRange(arr) {
  const sortedArr = arr.sort((a, b) => a - b);
  const q1 = quartile(sortedArr)[Math.floor(sortedArr.length / 4)];
  const q3 = quartile(sortedArr)[Math.floor((sortedArr.length / 4) * 3)];
  const interquartileRange = q3 - q1;
  return interquartileRange;
}

// a function that returns the skewness of an array
function skewness(arr) {
  const meanOfArr = mean(arr);
  const stdDev = standardDeviation(arr);
  const skewness =
    (arr.length / ((arr.length - 1) * (arr.length - 2))) *
    arr.reduce((acc, val) => {
      return acc + Math.pow((val - meanOfArr) / stdDev, 3);
    }, 0);
  return skewness;
}

// a function that returns the kurtosis of an array
function kurtosis(arr) {
  const meanOfArr = mean(arr);
  const stdDev = standardDeviation(arr);
  const kurtosis =
    (arr.length * (arr.length + 1)) /
      ((arr.length - 1) * (arr.length - 2) * (arr.length - 3)) -
    ((3 * Math.pow(arr.length - 1, 2)) /
      ((arr.length - 2) * (arr.length - 3))) *
      arr.reduce((acc, val) => {
        return acc + Math.pow((val - meanOfArr) / stdDev, 4);
      }, 0);
  return kurtosis;
}

// a function that returns the covariance of two arrays
function covariance(arr1, arr2) {
  const meanOfArr1 = mean(arr1);
  const meanOfArr2 = mean(arr2);
  const covariance =
    arr1.reduce((acc, val, idx) => {
      return acc + (val - meanOfArr1) * (arr2[idx] - meanOfArr2);
    }, 0) /
    (arr1.length - 1);
  return covariance;
}

// a function that returns the correlation of two arrays
function correlation(arr1, arr2) {
  const stdDev1 = standardDeviation(arr1);
  const stdDev2 = standardDeviation(arr2);
  const correlation = covariance(arr1, arr2) / (stdDev1 * stdDev2);
  return correlation;
}

// a function that returns the covariance matrix of two arrays
function covarianceMatrix(arr1, arr2) {
  const covarianceMatrix = [
    [variance(arr1), covariance(arr1, arr2)],
    [covariance(arr1, arr2), variance(arr2)],
  ];
  return covarianceMatrix;
}

// a function that returns the correlation matrix of two arrays
function correlationMatrix(arr1, arr2) {
  const correlationMatrix = [
    [1, correlation(arr1, arr2)],
    [correlation(arr1, arr2), 1],
  ];
  return correlationMatrix;
}

// a function that returns the covariance matrix of two arrays
function covarianceMatrix(arr1, arr2) {
  const covarianceMatrix = [
    [variance(arr1), covariance(arr1, arr2)],
    [covariance(arr1, arr2), variance(arr2)],
  ];
  return covarianceMatrix;
}
