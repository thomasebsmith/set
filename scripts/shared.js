window.shared = (function(global) {
  function randomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  function randomElement(array) {
    return array[randomIndex(array)];
  }

  return {
    randomIndex,
    randomElement,
  };
})(window);
