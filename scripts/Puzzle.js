class Puzzle {
  constructor() {
    // 50% chance of this puzzle being a set.
    this.isSet = Math.random() >= 0.5;

    if (this.isSet) {
      this.set = CardSet.createRandomValid();
    } else {
      this.set = CardSet.createRandomInvalid();
    }
  }
}
