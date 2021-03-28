(function(global) {
  const doc = global.document;
  const currentPuzzleEl = doc.querySelector(".current-puzzle");

  function showPuzzle() {
    const puzzle = new Puzzle();
    const cards = puzzle.set.getCards();
    for (const card of cards) {
      const cardEl = doc.createElement("img");
      cardEl.classList.add("card");
      cardEl.dataset.card = JSON.stringify(card);
      global.draw(card, url => {
        cardEl.setAttribute("src", url);
      });
      currentPuzzleEl.appendChild(cardEl);
    }
  }

  showPuzzle();
})(window);
