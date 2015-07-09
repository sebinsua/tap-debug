'use strict';

var utils = require('./utils');
var isString = utils.isString;

function stringify(object) {
  var objectString;
  if (isString(object)) {
    objectString = object;
  } else {
    objectString = JSON.stringify(object, null, 2);
  }

  return objectString;
}

module.exports = stringify;
