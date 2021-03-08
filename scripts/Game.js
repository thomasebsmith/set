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

    this._startTime = null;
    this._endTime = null;
    this._currStartTime = null;
    this._prevSecondsElapsed = 0;

    this.layoutCards();
  }

  start() {
    this._startTime = new Date();
    this._currStartTime = new Date();
  }

  pause() {
    this._prevSecondsElapsed = this.secondsElapsed;
    this._currStartTime = null;
  }

  get completed() {
    return this._completed;
  }

  get endTime() {
    return this._endTime;
  }

  get startTime() {
    return this._startTime;
  }

  get secondsElapsed() {
    let secondsElapsed = this._prevSecondsElapsed;
    if (this._currStartTime !== null) {
      secondsElapsed += (new Date() - this._currStartTime) / 1000;
    }
    return secondsElapsed;
  }

  get deckSize() {
    return this._deck.length;
  }

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

  getLayout() {
    return this._layout;
  }

  toJSON() {
    const endTimeJSON = this.endTime === null ? null : this.endTime.toJSON();
    const startTimeJSON = this.startTime === null ? null : this.startTime.toJSON();
    return {
      completed: this.completed,
      completedSets: this._completedSets.map(set => set.toJSON()),
      deck: this._deck.toJSON(),
      endTime: endTimeJSON,
      id: this._id,
      layout: this._layout.map(card => card.toJSON()),
      secondsElapsed: this.secondsElapsed,
      startTime: startTimeJSON,
      jsonVersion: Game._jsonVersion,
    };
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
    game._startTime = json.startTime === null ? null : new Date(json.startTime);
    game._endTime = json.endTime === null ? null : new Date(json.endTime);
    game._id = json.id;
    game._layout = json.layout.map(json => Card.fromJSON(json));
    game._prevSecondsElapsed = json.secondsElapsed;
    game._currStartTime = null;
    return game;
  }
}
