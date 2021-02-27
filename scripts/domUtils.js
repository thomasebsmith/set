(function(global) {
  // Convert a query string of the form "?key=value&..."
  // into an object of the form {"key": "value", ...}.
  global.parseQuery = (query = global.location.search) => {
    return Object.fromEntries(query.substring(1).split("&").map(keyVal =>
      keyVal.split("=").map(global.decodeURIComponent)
    ));
  };
})(window);
