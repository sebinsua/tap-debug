'use strict';

var compile = require('es6-template-strings/compile'),
    resolve = require('es6-template-strings/resolve-to-string');

var utils = require('./utils');
var identity = utils.identity;

var emojify = require('./emojify');
var colorify = require('./colorify');
var stringify = require('./stringify');

var DEFAULT_SEPARATOR = ': ';

function CompiledMessage(message, options) {
  this.compiledMessage = this.compile(message, options);
}

CompiledMessage.prototype.compile = function (message, options) {
  message = message || '';
  options = options || {};
  if (options.emojify !== false) {
    message = emojify(message);
  }
  if (options.colorify !== false) {
    message = colorify(message);
  }

  return compile(message);
};

CompiledMessage.prototype.resolve = function (object, options) {
  options = options || {};

  var messageComponents = [];

  var compiledMessage = this.compiledMessage;
  var resolvedMessage = resolve(compiledMessage, object);
  if (resolvedMessage !== '') {
    messageComponents.push(resolvedMessage);
  }

  if (options.stringifyObjects === true) {
    var objectString = stringify(object, options);
    messageComponents.push(objectString);
  }

  return messageComponents.
         filter(identity).
         join(options.stringifyObjectsSeparator || DEFAULT_SEPARATOR);
};

module.exports = function compileMessage(message, options) {
  return new CompiledMessage(message, options);
};
