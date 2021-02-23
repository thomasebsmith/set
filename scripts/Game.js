class Game {
  static _jsonVersion = 0;

  constructor(createDeck = true) {
    this._completed = false;
    this._completedSets = [];
    this._deck = new Deck();
    this._deck.shuffle();
    this._layout = [];

    this._currStartTime = null;
    this._prevSecondsElapsed = 0;

    this.layoutCards();
  }

  start() {
    this._currStartTime = new Date();
  }

  pause() {
    this._prevSecondsElapsed = this.secondsElapsed;
    this._currStartTime = null;
  }

  completed() {
    return this._completed;
  }

  get secondsElapsed() {
    const secondsElapsed = this._prevSecondsElapsed;
    if (this._currStartTime !== null) {
      secondsElapsed += (new Date() - this._currStartTime) / 1000;
    }
    return secondsElapsed;
  }

  layoutCards() {
    // TODO: Layout cards until a set exists
  }

  toJSON() {
    return {
      completed: this.completed,
      completedSets: this._completedSets.map(set => set.toJSON()),
      deck: this._deck.toJSON(),
      layout: this._layout.map(row => row.map(card => card.toJSON())),
      secondsElapsed: this.secondsElapsed,
      jsonVersion: Game._jsonVersion,
    }
  }

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
    game._layout = json.layout.map(row => row.map(json => Card.fromJSON(row)));
    game._prevSecondsElapsed = json.secondsElapsed;
    return game;
  }
}
