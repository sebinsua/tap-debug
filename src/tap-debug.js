'use strict';
/* eslint no-underscore-dangle: 0 */

var debug = require('./debug');
var compile = require('./message');

var utils = require('./utils');

var isString = utils.isString;
var isArray = utils.isArray;
var extend = utils.extend;

var returnNoop = function () {
  return function noop() {};
};

var DEFAULT_LOG = console.log.bind(console);
DEFAULT_LOG.enabled = true;

function tap(interceptor) {
  return function _tap(object) {
    interceptor(object);
    return object;
  };
}

function generateTapDebug(wrappedDebug) {
  return function tapDebug(message, onCallOptions) {
    return tap(wrappedDebug(message, onCallOptions));
  };
}

function generateTapIfElseDebug(wrappedDebug) {
  return function ifElseDebug(predicate, ifMessage, elseMessage, onCallOptions) {
    return tap(function ifElseOnObject(object) {
      if (predicate(object)) {
        wrappedDebug(ifMessage, onCallOptions)(object);
      } else {
        wrappedDebug(elseMessage, onCallOptions)(object);
      }
    });
  };
}

function generateTapSwitchCaseDebug(wrappedDebug) {
  var DEFAULT_CASE = 'default';
  return function switchCaseDebug(predicate, caseMessages, onCallOptions) {
    caseMessages = caseMessages || {};
    return tap(function switchCaseOnObject(object) {
      var generatedCase = predicate(object);
      var message = caseMessages[generatedCase];
      if (typeof message === 'undefined') {
        message = caseMessages[DEFAULT_CASE];
      }
      if (typeof message !== 'undefined') {
        wrappedDebug(message, onCallOptions)(object);
      }
    });
  };
}

function generateTernaryDebug(wrappedDebug) {
  return function ternaryWrappedDebug(rawMessage, object, options) {
    wrappedDebug(rawMessage, options)(object);
  };
}

function generateWrappedDebug(debugFn, initOptions) {
  function wrappedDebug(rawMessage, onCallOptions) {
    onCallOptions = extend({}, onCallOptions || {});
    if (!rawMessage) {
      onCallOptions.stringifyValue = true;
    }

    var newInitOptions = extend({}, initOptions);
    var options = extend(newInitOptions, onCallOptions);

    var rawMessages = isArray(rawMessage) ? rawMessage : [rawMessage];
    var compiledMessages = rawMessages.map(function (rm) {
      return compile(rm, {
        emojify: options.emojify,
        colorify: options.colorify
      });
    });

    return function wrappedDebugOnObject(object) {
      compiledMessages.forEach(function (cm) {
        var message = cm.resolve(object, {
          stringifyValue: options.stringifyValue,
          stringifyValueSeparator: options.stringifyValueSeparator
        });
        debugFn(message);
      });
    };
  }
  wrappedDebug.__wrapped = true;

  return wrappedDebug;
}

function wrapDebug(debugFn, initOptions) {
  var wrappedDebug = returnNoop;
  if (debugFn.enabled !== false) {
    wrappedDebug = generateWrappedDebug(debugFn, initOptions);
  }

  return wrappedDebug;
}

function initDefaultDebug(debugFn) {
  var defaultDebug;
  if (isString(debugFn)) {
    if (debug !== false) {
      var namespace = debugFn;
      defaultDebug = debug(namespace);
    } else {
      defaultDebug = DEFAULT_LOG;
    }
  } else {
    defaultDebug = debugFn || DEFAULT_LOG;
  }

  return defaultDebug;
}

function init(debugFn, initOptions) {
  initOptions = initOptions || {};

  var defaultDebug = initDefaultDebug(debugFn);
  var wrappedDebug = wrapDebug(defaultDebug, initOptions);

  var tapDebug = generateTapDebug(wrappedDebug);
  var ternaryDebug = generateTernaryDebug(wrappedDebug);
  var ifElse = generateTapIfElseDebug(wrappedDebug);
  var switchCase = generateTapSwitchCaseDebug(wrappedDebug);

  tapDebug.debug = ternaryDebug;
  tapDebug.ifElse = ifElse;
  tapDebug.switchCase = switchCase;

  return tapDebug;
}

module.exports = init;
