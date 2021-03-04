// Represents a set of three cards. The set may or may not form
// a valid Set that matches or differs in all characteristics.
class CardSet {
  // Used for serialization and deserialization.
  static _jsonVersion = 0;

  // The number of cards needed.
  static size = 3;

  // cards should be an array of Cards.
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

  // Returns whether all cards in this set match or differ in all
  // characteristics.
  isValid() {
    return ["number", "shape", "color", "pattern"].every(
      (attr) => this._isValidAttr(attr)
    );
  }

  // Serializes this CardSet to a JSON-compatible
  // object.
  toJSON() {
    return {
      cards: this._cards.map(card => card.toJSON()),
      jsonVersion: CardSet._jsonVersion,
    };
  }

  // Deserializes a CardSet from a JSON-compatible
  // object.
  static fromJSON(json) {
    if (json.jsonVersion !== 0) {
      throw Error("Invalid JSON version");
    }

    const set = new CardSet(json.cards.map(json => Card.fromJSON(json)));
    return set;
  }
}
