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

class Card {
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
}
