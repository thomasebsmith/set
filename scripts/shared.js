window.shared = (function(global) {
  function randomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

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
