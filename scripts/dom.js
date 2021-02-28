(function(global) {
  const doc = global.document;

  doc.querySelectorAll(".in-progress-games").forEach(tableEl => {
    for (const gameID of global.currentProfile.getInProgressGameIDs()) {
      const game = global.currentProfile.getGame(gameID);
      const rowEl = doc.createElement("tr");
      const props = [
        gameID + "",
        "Classic",
        game.deckSize + " cards"
      ];
      for (const prop of props) {
        const colEl = doc.createElement("td");
        colEl.textContent = prop;
        rowEl.appendChild(colEl);
      }
      tableEl.appendChild(rowEl);
    }
  });

  doc.querySelectorAll("[data-starts-new-game]").forEach(btn => {
    btn.addEventListener("click", () => {
      const gameID = global.currentProfile.createGame();
      global.location.href = "play.html?game=" +
        global.encodeURIComponent(gameID);
    });
  });
})(window);
