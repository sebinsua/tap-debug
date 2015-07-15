'use strict';

var debug = require('./debug');
var compile = require('./message');

var utils = require('./utils');

var isString = utils.isString;
var extend = utils.extend;

var DEFAULT_LOG = console.log.bind(console);

function tap(interceptor) {
  return function _tap(object) {
    interceptor(object);
    return object;
  };
}

function onObject(debugFn, rawMessage, options) {
  var compiledMessage = compile(rawMessage, {
    emojify: options.emojify,
    colorify: options.colorify
  });
  return function _onObject(object) {
    var message = compiledMessage.resolve(object, {
      stringifyObjects: options.stringifyObjects,
      stringifyObjectsSeparator: options.stringifyObjectsSeparator
    });
    debugFn(message);
  };
}

function debugObjects(debugFn, options) {
  return function _debugObjects(message, onCallOptions) {
    onCallOptions = onCallOptions || {};
    if (typeof message === 'undefined') {
      onCallOptions.stringifyObjects = true;
    }
    return tap(onObject(debugFn, message, extend(options, onCallOptions)));
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
