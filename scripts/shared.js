window.shared = (function(global) {
  // Returns the index of a uniformly random element of
  //  `array`.
  function randomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  // Returns a uniformly random element from `array`.
  function randomElement(array) {
    return array[randomIndex(array)];
  }

  // Generic zero padding function.
  function zeroPad(num, minDigits) {
    num += "";
    if (num.length < minDigits) {
      num = "0".repeat(minDigits - num.length) + num;
    }
    return num;
  }

  return {
    randomIndex,
    randomElement,
    zeroPad,
  };
})(window);
