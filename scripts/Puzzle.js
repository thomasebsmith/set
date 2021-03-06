class Puzzle {
  static _jsonVersion = 0;

  // 50% chance of any puzzle being a set.
  static chanceOfSet = 0.5;

  // Create a puzzle where the player must guess whether some cards form a set.
  constructor() {
    this.isSet = Math.random() < Puzzle.chanceOfSet;

    if (this.isSet) {
      this.set = CardSet.createRandomValid();
    } else {
      this.set = CardSet.createRandomInvalid();
    }

    this.timer = new Timer();
  }

  start() {
    this.timer.start();
  }

  pause() {
    this.timer.pause();
  }

  // Create an object to be used for JSON serialization of this puzzle.
  toJSON() {
    return {
      isSet: this.isSet,
      set: this.set.toJSON(),
      timer: this.timer.toJSON(),
      jsonVersion: Puzzle._jsonVersion,
    };
  }
  
  // Create a Puzzle from json, a json-compatible object of the format outputted
  //  by toJSON().
  static fromJSON(json) {
    if (json.jsonVersion !== 0) {
      throw Error("Invalid JSON version");
    }
    const puzzle = Object.create(Puzzle.prototype);
    puzzle.isSet = json.isSet;
    puzzle.set = CardSet.fromJSON(json.set);
    puzzle.timer = Timer.fromJSON(json.timer);
    return puzzle;
  }
}
