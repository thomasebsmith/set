(function(global) {
  const doc = global.document;

  function showGame(game) {
    const currentGameEl = doc.querySelector(".current-game");
    for (const card of game.getLayout()) {
      const cardEl = doc.createElement("img");
      global.draw(card, url => {
        cardEl.setAttribute("src", url);
      });
      currentGameEl.appendChild(cardEl);
    }
  }

  const query = global.parseQuery();
  if (query.game) {
    const gameID = parseInt(query.game, 10);
    if (Number.isFinite(gameID)) {
      const game = global.currentProfile.getGame(gameID);
      if (game === null) {
        console.warn("Unable to find game with ID", gameID);
      } else {
        showGame(game);
      }
    }
  }
})(window);
