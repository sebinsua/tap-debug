var debug = require('./debug');

var DEFAULT_LOG = console.log.bind(console);

function isString(object) {
  return typeof object === 'string';
}

function identity(object) {
  return !!object;
}

function tap(interceptor, object) {
  interceptor(object);
  return object;
}

function stringify(object) {
  var objectString;
  if (isString(object)) {
    objectString = object;
  } else {
    objectString = JSON.stringify(object, null, 2)
  }

  return objectString;
}

function onObject(debugFn, prefixMessage, separator) {
  separator = separator || '';
  return function (object) {
    var objectString = stringify(object);
    var message = [prefixMessage, objectString].filter(identity).join(separator);
    debugFn(message);
  };
}

function debugObjects(debugFn) {
  return function (prefixMessage, separator) {
    return tap(onObject(debugFn, prefixMessage, separator));
  };
}

function generateTapDebug(debugFn) {
  if (isString(debugFn)) {
    if (debug !== false) {
      var namespace = debugFn;
      debugFn = debug(debugFn)
    } else {
      debugFn = DEFAULT_LOG;
    }
  } else {
    debugFn = debugFn || DEFAULT_LOG;
  }

  var tapDebug = debugObjects(debugFn);
  return tapDebug;
}

module.exports = generateTapDebug;
