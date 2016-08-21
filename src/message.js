/* eslint no-underscore-dangle: 0 */

'use strict';

var compile = require('es6-template-strings/compile'),
    resolve = require('es6-template-strings/resolve-to-string');

var utils = require('./utils');
var isArray = utils.isArray;
var isObject = utils.isObject;
var identity = utils.identity;
var extend = utils.extend;

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

CompiledMessage.prototype.resolve = function (value, options) {
  options = options || {};

  var messageComponents = [];

  var defaultContext = options.ctx || {};
  var isRealObject = isObject(value) && !isArray(value);
  var object = isRealObject ? extend({}, value) : {};
  var context = extend(object, defaultContext);
  context.__value = stringify(value)
  context.__object = stringify(object);

  var compiledMessage = this.compiledMessage;
  var resolvedMessage;
  try {
    resolvedMessage = resolve(compiledMessage, context);
  } catch (err) {
    resolvedMessage = 'Invalid resolution of log message: "' + compiledMessage.literals.join('') + '"' +
                      ' due to one of the substitutions: ' + stringify(compiledMessage.substitutions);
  }
  if (resolvedMessage !== '') {
    messageComponents.push(resolvedMessage);
  }

  if (options.stringifyValue === true) {
    var contextString = stringify(value, options);
    messageComponents.push(contextString);
  }

  return messageComponents.
         filter(identity).
         join(options.stringifyValueSeparator || DEFAULT_SEPARATOR);
};

module.exports = function compileMessage(message, options) {
  return new CompiledMessage(message, options);
};
