class Profile {
  static _jsonVersion = 0;
  static _storagePrefix = "/set/profile-";

  static defaultName = "default";

  constructor(name) {
    this._name = name + "";
    this._completedGames = [];
    this._inProgressGames = [];
  }

  get name() {
    return this._name;
  }

  toJSON() {
    return {
      name: this.name,
      completedGames: this._completedGames.map(game => game.toJSON()),
      inProgressGames: this._inProgressGames.map(game => game.toJSON()),
      jsonVersion: Profile._jsonVersion,
    };
  }

  static fromJSON(json) {
    if (json.jsonVersion !== 0) {
      throw Error("Invalid JSON version");
    }

    const profile = new Profile(json.name);
    profile._completedGames = json.completedGames.map(json =>
      Game.fromJSON(json)
    );
    profile._inProgressGames = json.inProgressGames.map(json =>
      Game.fromJSON(json)
    );
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
