(function(global) {
  const doc = global.document;
  const currentGameEl = doc.querySelector(".current-game");
  const gameTimerEl = doc.querySelector(".game-timer");

  // Updates the game timer to read the time elapsed playing this game.
  function updateGameTimer(game) {
    let time = Math.round(game.secondsElapsed);

    const seconds = time % 60;
    time = Math.floor(time / 60);
    const minutes = time % 60;
    time = Math.floor(time / 60);
    const hours = time;

    gameTimerEl.textContent =
      `${hours}:${shared.zeroPad(minutes, 2)}:${shared.zeroPad(seconds, 2)}`;
  }

  // Clears any previous game and shows `game` in the play area.
  function showGame(game) {

    let selectedCardIndexes = new Set();

    currentGameEl.textContent = "";

    for (let i = 0; i < game.getLayout().length; ++i) {
      const card = game.getLayout()[i];

      const cardEl = doc.createElement("img");
      cardEl.classList.add("card");
      cardEl.dataset.card = JSON.stringify(card);
      global.draw(card, url => {
        cardEl.setAttribute("src", url);
      });
      currentGameEl.appendChild(cardEl);
      cardEl.addEventListener("click", () => {
        if (selectedCardIndexes.has(i)) {
          selectedCardIndexes.delete(i);
          cardEl.classList.remove("selected");
        } else if (selectedCardIndexes.size < CardSet.size) {
          selectedCardIndexes.add(i);
          cardEl.classList.add("selected");
          if (selectedCardIndexes.size === CardSet.size) {
            if (game.trySet(selectedCardIndexes)) {
              showGame(game);
            } else {
              selectedCardIndexes.clear();
              document.querySelectorAll(".card.selected").forEach(el =>
                el.classList.remove("selected"));
            }
          }
        }
      });
    }
  }

  // See if we should load a game.
  const query = global.parseQuery();
  if (query.game) {
    const gameID = parseInt(query.game, 10);
    if (Number.isFinite(gameID)) {
      const game = global.currentProfile.getGame(gameID);
      if (game === null) {
        console.warn("Unable to find game with ID", gameID);
      } else {
        game.start();
        showGame(game);
        setInterval(() => updateGameTimer(game), 0.25 * 1000);
      }
    }
  }
})(window);
