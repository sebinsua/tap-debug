'use strict';

var compile = require('es6-template-strings/compile'),
    resolve = require('es6-template-strings/resolve-to-string');

var utils = require('./utils');
var identity = utils.identity;

var emojify = require('./emojify');
var stringify = require('./stringify');

var DEFAULT_SEPARATOR = ': ';

function CompiledMessage(message) {
  this.compiledMessage = compile(message);
}

CompiledMessage.prototype.resolve = function (object, options) {
  options = options || {};

  var compiledMessage = this.compiledMessage;
  var resolvedMessage = emojify(resolve(compiledMessage, object));

  var messageComponents = [
    resolvedMessage
  ];

  if (options.stringifyObjects === true) {
    var objectString = stringify(object);
    messageComponents.push(objectString);
  }

  return messageComponents.filter(identity).join(options.separator || DEFAULT_SEPARATOR);
};

module.exports = function compileMessage (message) {
  return new CompiledMessage(message);
};
