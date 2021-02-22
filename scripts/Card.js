const Color = {
  red: "red",
  green: "green",
  purple: "purple",
};
const colors = Object.values(Color);

const Pattern = {
  solid: "solid",
  striped: "striped",
  empty: "empty",
};
const patterns = Object.values(Pattern);

const Shape = {
  diamond: "diamond",
  oval: "oval",
  squiggle: "sqiggle",
};
const shapes = Object.values(Shape);

const numbers = [1, 2, 3];

class Card {
  static _jsonVersion = 0;

  constructor(number, shape, color, pattern) {
    this._number = number;
    this._shape = shape;
    this._color = color;
    this._pattern = pattern;
  }

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

  toJSON() {
    return {
      number: this.number,
      shape: this.shape,
      color: this.color,
      pattern: this.pattern,
      jsonVersion: Card._jsonVersion,
    };
  }

  static fromJSON(json) {
    if (json.jsonVersion !== 0) {
      throw Error("Invalid JSON version");
    }

    const card = new Card(json.number, json.shape, json.color, json.pattern);
    return card;
  }
}
