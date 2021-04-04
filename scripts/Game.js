class Game {
  static _jsonVersion = 0;
  static minCards = 12;

  constructor(id) {
    this._id = id;

    this._completed = false;
    this._completedSets = [];
    this._deck = new Deck();
    this._deck.shuffle();
    this._layout = [];

    this._timer = new Timer();

    this.layoutCards();
  }

  // Starts a paused game. Games are initially paused.
  start() {
    this._timer.start();
  }

  // Pauses a started game. Games are initially paused.
  pause() {
    this._timer.pause();
  }

  // Whether a game is finished.
  get completed() {
    return this._completed;
  }

  // The Date that the game was finished, or null.
  get endTime() {
    return this._timer.endTime;
  }

  // The Date that the game was first started, or null.
  get startTime() {
    return this._timer.startTime;
  }

  // How many seconds have been spent playing the game.
  get secondsElapsed() {
    return this._timer.secondsElapsed;
  }

  // How many cards are left in the deck.
  get deckSize() {
    return this._deck.length;
  }

  // Lays out cards until a set is possible or there are no more cards.
  layoutCards() {
    // TODO: Make this more efficient
    const cardsPerLayout = 3;
    while (this._layout.length < Game.minCards || !this.setExists()) {
      if (this._deck.empty && !this.setExists()) {
        this.pause();
        this._completed = true;
        this._endTime = new Date();
        return;
      }
      for (let i = 0; i < cardsPerLayout && !this._deck.empty; ++i) {
        this._layout.push(this._deck.drawOne());
      }
    }
  }

  // Whether a set exists on the current board.
  setExists() {
    // TODO: Make this more efficient
    for (let card1 = 0; card1 < this._layout.length; ++card1) {
      for (let card2 = card1 + 1; card2 < this._layout.length; ++card2) {
        for (let card3 = card2 + 1; card3 < this._layout.length; ++card3) {
          if (new CardSet([
              this._layout[card1],
              this._layout[card2],
              this._layout[card3]
          ]).isValid()) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // Attempt to make a set with the cards at indexes cardIndexes.
  // Requires that cardIndexes.length === 3.
  trySet(cardIndexes) {
    cardIndexes = [...cardIndexes];

    // Reverse sort card indexes. Useful for removal later.
    cardIndexes.sort((left, right) => right - left);
    const set = new CardSet(cardIndexes.map(index => this._layout[index]));
    if (!set.isValid()) {
      return false;
    }
    this._completedSets.push(set);
    for (const index of cardIndexes) {
      this._layout.splice(index, 1);
    }
    this.layoutCards();
    return true;
  }

  // The board layout.
  getLayout() {
    return this._layout;
  }

  // Serializes the game.
  toJSON() {
    return {
      completed: this.completed,
      completedSets: this._completedSets.map(set => set.toJSON()),
      deck: this._deck.toJSON(),
      id: this._id,
      layout: this._layout.map(card => card.toJSON()),
      timer: this._timer.toJSON(),
      jsonVersion: Game._jsonVersion,
    };
  }

  // Deserializes a game.
  static fromJSON(json) {
    if (json.jsonVersion !== 0) {
      throw Error("Invalid JSON version");
    }

    // Use Object.create instead of the constructor for performance (so we
    //  don't have to create and layout an entire deck).
    const game = Object.create(Game.prototype);
    game._completed = json.completed;
    game._completedSets = json.completedSets.map(json =>
      CardSet.fromJSON(json));
    game._deck = Deck.fromJSON(json.deck);
    game._id = json.id;
    game._layout = json.layout.map(json => Card.fromJSON(json));
    game._timer = Timer.fromJSON(json.timer);
    return game;
  }
}
