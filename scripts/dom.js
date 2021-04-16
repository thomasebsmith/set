(function(global) {
  const doc = global.document;

  // Add all in progress games to any elements with the class
  //  in-progress-games. Each of these elements should be a <table>.
  doc.querySelectorAll(".in-progress-games").forEach(tableEl => {
    if (global.currentProfile.getInProgressGameIDs().length === 0) {
      tableEl.classList.add("empty");
      return;
    }
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
    if (global.currentProfile.getCompletedGameIDs().length === 0) {
      tableEl.classList.add("empty");
      return;
    }
    for (const gameID of global.currentProfile.getCompletedGameIDs()) {
      const game = global.currentProfile.getGame(gameID);
      const rowEl = doc.createElement("tr");
      const props = [
        gameID + "",
        game.startTime.toLocaleDateString(),
        "Classic",
        game.timer.secondsElapsed + " seconds",
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

  let puzzleStats = null;
  function getPuzzleStats() {
    if (puzzleStats === null) {
      const puzzles = global.currentProfile.getCompletedPuzzles();

      let minTime = Infinity;
      let maxTime = -Infinity;
      let totalTime = 0;

      puzzles.sort();

      let medianTime = NaN;
      if (puzzles.length % 2 === 0 && puzzles.length !== 0) {
        medianTime = (puzzles[puzzles.length / 2 - 1].timer.secondsElapsed
          + puzzles[puzzles.length / 2].timer.secondsElapsed);
      } else if (puzzles.length % 2 === 1) {
        medianTime = puzzles[(puzzles.length - 1) / 2];
      }

      for (const puzzle of puzzles) {
        totalTime += puzzle.timer.secondsElapsed;
        minTime = Math.min(minTime, puzzle.timer.secondsElapsed);
        maxTime = Math.max(maxTime, puzzle.timer.secondsElapsed);
      }

      const meanTime = totalTime / puzzles.length;
      const count = puzzles.length;

      puzzleStats = {
        count,
        medianTime,
        meanTime,
        minTime,
        maxTime,
      };
    }
    return puzzleStats;
  }

  doc.querySelectorAll(".num-puzzles-completed").forEach(el => {
    const stats = getPuzzleStats();
    el.textContent = stats.count;
  });
  doc.querySelectorAll(".median-puzzle-time").forEach(el => {
    const stats = getPuzzleStats();
    el.textContent = `${stats.medianTime.toFixed(2)}s`;
  });
  doc.querySelectorAll(".mean-puzzle-time").forEach(el => {
    const stats = getPuzzleStats();
    el.textContent = `${stats.meanTime.toFixed(2)}s`;
  });
  doc.querySelectorAll(".minimum-puzzle-time").forEach(el => {
    const stats = getPuzzleStats();
    el.textContent = `${stats.minTime.toFixed(2)}s`;
  });
  doc.querySelectorAll(".maximum-puzzle-time").forEach(el => {
    const stats = getPuzzleStats();
    el.textContent = `${stats.maxTime.toFixed(2)}s`;
  });
})(window);
