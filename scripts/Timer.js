class Timer {
  static _jsonVersion = 0;
  constructor() {
    this._startTime = null;
    this._endTime = null;
    this._currStartTime = null;
    this._prevSecondsElapsed = 0;
  }

  start() {
    if (this._startTime === null) {
      this._startTime = new Date();
    }
    this._currStartTime = new Date();
  }

  pause() {
    this._prevSecondsElapsed = this.secondsElapsed;
    this._currStartTime = null;
  }

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }

  get secondsElapsed() {
    let secondsElapsed = this._prevSecondsElapsed;
    if (this._currStartTime !== null) {
      secondsElapsed += (new Date() - this._currStartTime) / 1000;
    }
    return secondsElapsed;
  }

  toJSON() {
    const startTimeJSON = this.startTime === null ?
      null :
      this.startTime.toJSON();
    const endTimeJSON = this.endTime === null ?
      null :
      this.endTime.toJSON();

    return {
      startTime: startTimeJSON,
      endTime: endTimeJSON,
      secondsElapsed: this.secondsElapsed,
      jsonVersion: Timer._jsonVersion,
    };
  }

  // Updates gameTimerEl to read the time elapsed playing this game.
  updateTimerElement(gameTimerEl) {
    let time = Math.round(game.secondsElapsed);

    const seconds = time % 60;
    time = Math.floor(time / 60);
    const minutes = time % 60;
    time = Math.floor(time / 60);
    const hours = time;

    gameTimerEl.textContent =
      `${hours}:${shared.zeroPad(minutes, 2)}:${shared.zeroPad(seconds, 2)}`;
  }

  static fromJSON(json) {
    if (json.jsonVersion !== 0) {
      throw Error("Invalid JSON version");
    }

    const timer = Object.create(Timer.prototype);
    timer._startTime = json.startTime === null ? null : new Date(json.startTime);
    timer._endTime = json.endTime === null ? null : new Date(json.endTime);
    timer._currStartTime = null;
    timer._prevSecondsElapsed = json.secondsElapsed;
    return timer;
  }
}
