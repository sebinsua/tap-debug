'use strict';

function isString(object) {
  return typeof object === 'string';
}

function identity(object) {
  return !!object;
}

module.exports.isString = isString;
module.exports.identity = identity;
