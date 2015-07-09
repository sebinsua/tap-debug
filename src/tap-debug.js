'use strict';

var debug = require('./debug');

var DEFAULT_LOG = console.log.bind(console);

function isString(object) {
  return typeof object === 'string';
}

function identity(object) {
  return !!object;
}

function tap(interceptor) {
  return function _tap(object) {
    interceptor(object);
    return object;
  };
}

function stringify(object) {
  var objectString;
  if (isString(object)) {
    objectString = object;
  } else {
    objectString = JSON.stringify(object, null, 2);
  }

  return objectString;
}

function onObject(debugFn, prefixMessage, separator, options) {
  separator = separator || '';
  return function _onObject(object) {
    var message;

    var messageComponents = [prefixMessage];
    if (options.stringifyObjects !== false) {
      var objectString = stringify(object);
      messageComponents.push(objectString);
    }

    message = messageComponents.filter(identity).join(separator);
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
