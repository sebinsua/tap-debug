'use strict';

var pluralize = require('pluralize');

var colors;
try {
  var hex = require('text-hex');
  var crayon = require('@ccheever/crayon');
  colors = {
    hex: hex.bind(hex),
    crayon: crayon.bind(crayon)
  };
} catch (_) {
  colors = false;
}

var GET_VARIABLE_NAMES_REGEX = /\$\{([A-Za-z_0-9]+)\}/g;

function createGetVariablesRegex(variables) {
  return new RegExp('(' + variables.map(function (v) {
    return '\\$\\{' + v + '\\}';
  }).join('|') + ')', 'g');
}

function createGetPluralsRegex(plurals) {
  return new RegExp('(' + plurals.join('|') + ')', 'g');
}

function getColors(variables) {
  var variableColors = {};
  variables.forEach(function (variable) {
    var pluralVariable = pluralize.plural(variable);
    var variableColor = colors.hex(pluralVariable);

    variableColors[variable] = variableColor;
    variableColors[pluralVariable] = variableColor;
  });
  return variableColors;
}

function colorify(str) {
  if (str && colors !== false) {
    var variables = [];
    var matches;
    while ((matches = GET_VARIABLE_NAMES_REGEX.exec(str)) !== null) {
      if (matches[1]) {
        variables.push(matches[1]);
      }
    }

    if (!variables || variables.length === 0) {
      return str;
    }

    var variableColors = getColors(variables);

    var colorifier = function (key, color) {
      color = color || variableColors[key];
      return colors.crayon(color).bold(key);
    };
    var replaceVariable = function (variable) {
      var variableName = variable.substring(2, variable.length - 1);
      return colorifier(variable, variableColors[variableName]);
    };
    var replacePlural = function (plural) {
      return colorifier(plural);
    };

    var GET_VARIABLES_REGEX = createGetVariablesRegex(variables);
    str = str.replace(GET_VARIABLES_REGEX, replaceVariable);

    var plurals = variables.map(pluralize.plural);
    var GET_PLURALS_REGEX = createGetPluralsRegex(plurals);
    str = str.replace(GET_PLURALS_REGEX, replacePlural);
  }

  return str;
}

module.exports = colorify;
