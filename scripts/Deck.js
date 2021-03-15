class Deck {
  static _jsonVersion = 0;

  constructor() {
    this.reset();
  }

  // Resets the deck to a (non-shuffled) array of all Set cards.
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

  // Randomly shuffles the deck using Math.random.
  shuffle() {
    // Using a Fisher-Yates shuffle
    for (let i = this._cards.length - 1; i >= 1; --i) {
      const swapIndex = Math.floor(Math.random() * (i + 1));

      const temp = this._cards[i];
      this._cards[i] = this._cards[swapIndex];
      this._cards[swapIndex] = temp;
    }
  }

  // The number of cards in the deck.
  get length() {
    return this._cards.length;
  }

  // Whether the deck is empty.
  get empty() {
    return this.length === 0;
  }

  // Returns the next card in the deck. Throws an error if the deck is empty.
  drawOne() {
    if (this.empty) {
      throw Error("Cannot draw from empty deck");
    }
    return this._cards.pop();
  }

  // Returns a JSON-compatible object for serialization.
  toJSON() {
    return {
      cards: this._cards.map(card => card.toJSON()),
      jsonVersion: Deck._jsonVersion,
    };
  }

  // Converts a JSON-compatible object (of the format outputted by toJSON) to
  //  a Deck.
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
