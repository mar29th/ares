function isArray(a) {
  // From http://stackoverflow.com/a/4775737
  return Object.prototype.toString.call(val) === '[object Array]';
}

function isObject(o) {
  // From http://stackoverflow.com/a/22482737
  return typeof o === 'function' || typeof o === 'object'
}

module.exports = {
  isArray: isArray,
  isObject: isObject
};
