(function(global) {
  const doc = global.document;

  doc.querySelectorAll(".in-progress-games").forEach(tableEl => {
//    for (
  });

  doc.querySelectorAll("[data-starts-new-game]").forEach(btn => {
    btn.addEventListener("click", () => {
      const gameID = global.currentProfile.createGame();
      global.location.href = "play.html?game=" +
        global.encodeURIComponent(gameID);
    });
  });
})(window);
