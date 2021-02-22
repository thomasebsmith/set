class Deck {
  static _jsonVersion = 0;

  constructor() {
    this.reset();
  }

  reset() {
    this._cards = [];
    for (const number of numbers) {
      for (const shape of shapes) {
        for (const color of colors) {
          for (const pattern of patterns) {
            this._cards.push(new Card(number, shape, color, pattern));
          }
        }
      }
    }
  }

  shuffle() {
    // Using a Fisher-Yates shuffle
    for (let i = this._cards.length - 1; i >= 1; --i) {
      const swapIndex = Math.floor(Math.random() * (i + 1));

      const temp = this._cards[i];
      this._cards[i] = this._cards[swapIndex];
      this._cards[swapIndex] = temp;
    }
  }

  get empty() {
    return this._cards.length === 0;
  }

  drawOne() {
    if (this.empty) {
      throw Error("Cannot draw from empty deck");
    }
    return this._cards.pop();
  }

  toJSON() {
    return {
      cards: this._cards.map(card => card.toJSON()),
      jsonVersion: Deck._jsonVersion,
    };
  }

  static fromJSON(json) {
    if (json.jsonVersion !== 0) {
      throw Error("Invalid JSON version");
    }

    // Use Object.create for performance. See note in Game.js.
    const deck = Object.create(Deck.prototype);
    deck._cards = json.cards.map(json => Card.fromJSON(json));
    return deck;
  }
}
