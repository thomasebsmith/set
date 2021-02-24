class Profile {
  static _jsonVersion = 0;
  static _storagePrefix = "/set/profile-";

  static defaultName = "default";

  constructor(name) {
    this._name = name + "";
    this._completedGameIDs = [];
    this._inProgressGameIDs = [];
    this._games = [];
  }

  get name() {
    return this._name;
  }

  createGame() {
    const id = this._games.push(new Game(this._games.length)) - 1;
    this._inProgressGameIDs.push(id);
    return id;
  }

  getGame(id) {
    if (id >= this._games.length) {
      return null;
    }
    return this._games[id];
  }

  toJSON() {
    return {
      name: this.name,
      completedGameIDs: this._completedGameIDs,
      inProgressGameIDs: this._inProgressGameIDs,
      games: this._games.map(game => game.toJSON()),
      jsonVersion: Profile._jsonVersion,
    };
  }

  static fromJSON(json) {
    if (json.jsonVersion !== 0) {
      throw Error("Invalid JSON version");
    }

    const profile = new Profile(json.name);
    profile._completedGameIDs = json.completedGameIDs;
    profile._inProgressGameIDs = json.inProgressGameIDs;
    profile._games = json.games.map(json => Game.fromJSON(json));
    return profile;
  }

  toStorage() {
    const storage = window.localStorage;
    const key = Profile._storagePrefix + this.name;
    try {
      storage.setItem(key, JSON.stringify(this.toJSON()));
    } catch (_) {
      // This error is probably due to running out of room in localStorage.
      //  (e.g., there is a 0-byte quota in some versions of mobile Safari).
      return false;
    }
    return true;
  }

  static fromStorage(name) {
    const storage = window.localStorage;
    const key = Profile._storagePrefix + name;
    const storageItem = storage.getItem(key);
    if (storageItem === null) {
      return null;
    }
    return Profile.fromJSON(JSON.parse(storageItem));
  }
}

window.currentProfile = Profile.fromStorage(Profile.defaultName);
if (window.currentProfile === null) {
  window.currentProfile = new Profile(Profile.defaultName);
  window.currentProfile.toStorage();
}
