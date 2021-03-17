// Represents a user's profile (name, completed games, etc.)
//  Note: Only one profile can exist right now (the default profile).
class Profile {
  static _jsonVersion = 0;
  static _storagePrefix = "/set/profile-";

  static defaultName = "default";

  // Creates a profile with the name `name` (and no in progress or completed
  //  games).
  constructor(name) {
    this._name = name + "";
    this._completedGameIDs = [];
    this._inProgressGameIDs = [];
    this._games = [];
  }

  // The name of the profile.
  get name() {
    return this._name;
  }

  // Adds a new in progress game to this profile and returns its ID.
  createGame() {
    const id = this._games.push(new Game(this._games.length)) - 1;
    this._inProgressGameIDs.push(id);
    return id;
  }

  // Returns the Game with ID `id`.
  getGame(id) {
    if (id >= this._games.length) {
      return null;
    }
    return this._games[id];
  }

  // Returns an array of all IDs for games that are in progress. This array
  //  should not be modified.
  getInProgressGameIDs() {
    return this._inProgressGameIDs;
  }

  // Returns an array of all IDs for games that are completed. This array
  //  should not be modified.
  getCompletedGameIDs() {
    return this._completedGameIDs;
  }

  // Returns a JSON-compatible object for serialization.
  toJSON() {
    return {
      name: this.name,
      completedGameIDs: this._completedGameIDs,
      inProgressGameIDs: this._inProgressGameIDs,
      games: this._games.map(game => game.toJSON()),
      jsonVersion: Profile._jsonVersion,
    };
  }

  // Creates a Profile from the JSON-compatible object `json`. `json` should be
  //  of the form outputted by `toJSON()`.
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

  // Saves this Profile to local storage.
  toStorage() {
    const storage = window.localStorage;
    const key = Profile._storagePrefix + this.name;
    try {
      storage.setItem(key, JSON.stringify(this.toJSON()));
    } catch (err) {
      // This error is probably due to running out of room in localStorage.
      //  (e.g., there is a 0-byte quota in some versions of mobile Safari).
      console.warn("Error saving to storage", err);
      return false;
    }
    return true;
  }

  // Retrieves the profile with name `name` from local storage.
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

// Attempt to load the default profile from local storage.
window.currentProfile = Profile.fromStorage(Profile.defaultName);
if (window.currentProfile === null) {
  window.currentProfile = new Profile(Profile.defaultName);
}

// Before this page is closed, save the current profile to local storage.
window.addEventListener("beforeunload", () => {
  window.currentProfile.toStorage();
});

// Every 15 seconds, save the current profile to local storage.
window.setInterval(() => {
  window.currentProfile.toStorage();
}, 15 * 1000);
