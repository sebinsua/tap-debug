'use strict';

function isString(object) {
  return typeof object === 'string';
}

function identity(object) {
  return !!object;
}

function extend(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
                            source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      extend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
}

module.exports.isString = isString;
module.exports.identity = identity;
module.exports.extend = extend;
