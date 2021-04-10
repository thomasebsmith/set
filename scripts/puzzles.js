(function(global) {
  const doc = global.document;

  const currentPuzzleEl = doc.querySelector(".current-puzzle");
  const isSetEl = doc.querySelector(".is-set");
  const notASetEl = doc.querySelector(".not-a-set");
  const gameTimerEl = doc.querySelector(".game-timer");

  let currentPuzzle = null;

  function showPuzzle() {
    currentPuzzle = new Puzzle();
    currentPuzzle.start();
    currentPuzzleEl.textContent = "";
    const cards = currentPuzzle.set.getCards();
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

  function answerPuzzle(isSet) {
    if (isSet !== currentPuzzle.isSet) {
      // Incorrect answer, do nothing (for now, TODO).
      return;
    }
    currentPuzzle.pause();
    global.currentProfile.completePuzzle(currentPuzzle);
    showPuzzle();
  }

  isSetEl.addEventListener("click", () => {
    answerPuzzle(true);
  });
  notASetEl.addEventListener("click", () => {
    answerPuzzle(false);
  });

  showPuzzle();

  setInterval(
    () => {
      if (currentPuzzle !== null) {
        currentPuzzle.timer.updateTimerElement(gameTimerEl);
      }
    },
    0.25 * 1000
  );
})(window);
