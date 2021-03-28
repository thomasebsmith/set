class Puzzle {
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
  }
}
