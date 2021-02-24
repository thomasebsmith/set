class CardSet {
  static _jsonVersion = 0;
  static size = 3;

  constructor(cards) {
    this._cards = cards;
    if (this._cards.length !== CardSet.size) {
      throw Error(`All sets must have ${CardSet.size} cards`);
    }
  }

  _isValidAttr(attr) {
    const attrSet = new Set(this._cards.map(card => card[attr]));
    return attrSet.size === this._cards.length || attrSet.size === 1;
  }

  isValid() {
    return ["number", "shape", "color", "pattern"].every(
      (attr) => this._isValidAttr(attr)
    );
  }

  toJSON() {
    return {
      cards: this._cards.map(card => card.toJSON()),
      jsonVersion: CardSet._jsonVersion,
    };
  }

  static fromJSON(json) {
    if (json.jsonVersion !== 0) {
      throw Error("Invalid JSON version");
    }

    const set = new CardSet(json.cards.map(json => Card.fromJSON(json)));
    return set;
  }
}
