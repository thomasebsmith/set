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

  // Returns an array of all the cards in this set. Note that this is a copy
  //  of this CardSet's internal array.
  getCards() {
    return this._cards.slice();
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

  static _missingAttr(attrList, firstAttr, secondAttr) {
    if (firstAttr !== secondAttr) {
      return attrList.find(x => x !== firstAttr && x !== secondAttr);
    }
    return firstAttr;
  }

  static _missingCard(firstCard, secondCard) {
    return new Card(
      CardSet._missingAttr(numbers, firstCard.number, secondCard.number),
      CardSet._missingAttr(shapes, firstCard.shape, secondCard.shape),
      CardSet._missingAttr(colors, firstCard.color, secondCard.color),
      CardSet._missingAttr(patterns, firstCard.pattern, secondCard.pattern)
    );
  }

  // Creates a random (valid) set.
  static createRandomValid() {
    const firstCard = Card.getRandom();

    let secondCard;
    do {
      secondCard = Card.getRandom();
    } while (secondCard.equals(firstCard));

    const thirdCard = CardSet._missingCard(firstCard, secondCard);

    return new CardSet([firstCard, secondCard, thirdCard]);
  }

  static createRandomInvalid() {
    const firstCard = Card.getRandom();

    let secondCard;
    do {
      secondCard = Card.getRandom();
    } while (secondCard.equals(firstCard));

    const wrongCard = CardSet._missingCard(firstCard, secondCard);

    let thirdCard;
    do {
      thirdCard = Card.getRandom();
    } while (
      thirdCard.equals(firstCard) ||
      thirdCard.equals(secondCard) ||
      thirdCard.equals(wrongCard)
    );

    return new CardSet([firstCard, secondCard, thirdCard]);
  }

  // Serializes this CardSet to a JSON-compatible object.
  toJSON() {
    return {
      cards: this._cards.map(card => card.toJSON()),
      jsonVersion: CardSet._jsonVersion,
    };
  }

  // Deserializes a CardSet from a JSON-compatible object.
  static fromJSON(json) {
    if (json.jsonVersion !== 0) {
      throw Error("Invalid JSON version");
    }

    const set = new CardSet(json.cards.map(json => Card.fromJSON(json)));
    return set;
  }
}
