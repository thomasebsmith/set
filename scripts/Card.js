// Enum representing the possible card colors.
const Color = {
  red: "red",
  green: "green",
  purple: "purple",
};
const colors = Object.values(Color);

// Enum representing the possible card patterns.
const Pattern = {
  solid: "solid",
  striped: "striped",
  empty: "empty",
};
const patterns = Object.values(Pattern);

// Enum representing the possible card shapes.
const Shape = {
  diamond: "diamond",
  oval: "oval",
  squiggle: "sqiggle",
};
const shapes = Object.values(Shape);

// The possible card numbers.
const numbers = [1, 2, 3];

class Card {
  // Used internally for serialization.
  static _jsonVersion = 0;

  // Creates a Card with the given parameters.
  // Each argument should be from its corresponding enum.
  constructor(number, shape, color, pattern) {
    this._number = number;
    this._shape = shape;
    this._color = color;
    this._pattern = pattern;
  }

  // Getters
  get number() {
    return this._number;
  }
  get shape() {
    return this._shape;
  }
  get color() {
    return this._color;
  }
  get pattern() {
    return this._pattern;
  }

  equals(otherCard) {
    return this.number === otherCard.number &&
      this.shape === otherCard.shape &&
      this.color === otherCard.color &&
      this.pattern === otherCard.pattern;
  }

  // Get a random card.
  static getRandom() {
    return new Card(
      shared.randomElement(numbers),
      shared.randomElement(shapes),
      shared.randomElement(colors),
      shared.randomElement(patterns)
    );
  }

  // Serializes this Card to a JSON-compatible object.
  toJSON() {
    return {
      number: this.number,
      shape: this.shape,
      color: this.color,
      pattern: this.pattern,
      jsonVersion: Card._jsonVersion,
    };
  }

  // Deserializes a Card from the object `json`.
  // This is the inverse of `toJSON()`.
  static fromJSON(json) {
    if (json.jsonVersion !== 0) {
      throw Error("Invalid JSON version");
    }

    const card = new Card(json.number, json.shape, json.color, json.pattern);
    return card;
  }
}
