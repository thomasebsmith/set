(function(global) {
  global.parseQuery = (query = global.location.search) => {
    return Object.fromEntries(query.substring(1).split("&").map(keyVal =>
      keyVal.split("=").map(global.decodeURIComponent)
    ));
  };
})(window);
