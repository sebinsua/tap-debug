'use strict';

var debug = require('./debug');
var compile = require('./message');

var utils = require('./utils');

var isString = utils.isString;

var DEFAULT_LOG = console.log.bind(console);

function tap(interceptor) {
  return function _tap(object) {
    interceptor(object);
    return object;
  };
}

function onObject(debugFn, prefixMessage, separator, options) {
  separator = separator || '';

  var compiledMessage = compile(prefixMessage);
  return function _onObject(object) {
    var message = compiledMessage.resolve(object, {
      stringifyObjects: options.stringifyObjects,
      separator: separator
    });
    debugFn(message);
  };
}

function debugObjects(debugFn, options) {
  return function _debugObjects(prefixMessage, separator) {
    return tap(onObject(debugFn, prefixMessage, separator, options));
  };
}

function generateTapDebug(debugFn, options) {
  options = options || {};

  if (isString(debugFn)) {
    if (debug !== false) {
      var namespace = debugFn;
      debugFn = debug(namespace);
    } else {
      debugFn = DEFAULT_LOG;
    }
  } else {
    debugFn = debugFn || DEFAULT_LOG;
  }

  var tapDebug = debugObjects(debugFn, options);
  return tapDebug;
}

module.exports = generateTapDebug;
