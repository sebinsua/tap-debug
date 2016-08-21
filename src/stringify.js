'use strict';

var util = require('util');

var utils = require('./utils');
var isString = utils.isString;

function jsonify(object) {
  return JSON.stringify(object, null, 2);
}

function inspect(object) {
  return util.inspect(object, {
    depth: null,
    colors: true
  });
}

function stringify(object, options) {
  options = options || {};

  var objectString;
  if (isString(object)) {
    objectString = object;
  } else {
    objectString = options.stringifyValueFormatter === 'json' ? jsonify(object) : inspect(object);
  }

  return objectString;
}

module.exports = stringify;
