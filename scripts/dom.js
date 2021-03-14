(function(global) {
  const doc = global.document;

  // Add all in progress games to any elements with the class
  //  in-progress-games. Each of these elements should be a <table>.
  doc.querySelectorAll(".in-progress-games").forEach(tableEl => {
    for (const gameID of global.currentProfile.getInProgressGameIDs()) {
      const game = global.currentProfile.getGame(gameID);
      const rowEl = doc.createElement("tr");
      const props = [
        gameID + "",
        "Classic",
        game.deckSize + " cards",
      ];
      for (const prop of props) {
        const colEl = doc.createElement("td");
        colEl.textContent = prop;
        rowEl.appendChild(colEl);
      }
      tableEl.appendChild(rowEl);
    }
  });

  // Add all completed games to any elements with the class
  //  game-history. Each of these elements should be a <table>.
  doc.querySelectorAll(".game-history").forEach(tableEl => {
    for (const gameID of global.currentProfile.getCompletedGameIDs()) {
      const game = global.currentProfile.getGame(gameID);
      const rowEl = doc.createElement("tr");
      const props = [
        gameID + "",
        game.startTime.toLocaleDateString(),
        "Classic",
        game.secondsElapsed + " seconds",
      ];
      for (const prop of props) {
        const colEl = doc.createElement("td");
        colEl.textContent = prop;
        rowEl.appendChild(colEl);
      }
      tableEl.appendChild(rowEl);
    }
  });

  // Add listeners so that whenever a button with attribute
  //  data-starts-new-game is clicked, a new game will start.
  doc.querySelectorAll("[data-starts-new-game]").forEach(btn => {
    btn.addEventListener("click", () => {
      const gameID = global.currentProfile.createGame();
      global.location.href = "play.html?game=" +
        global.encodeURIComponent(gameID);
    });
  });
})(window);
