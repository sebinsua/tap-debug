'use strict';

var emojis;
try {
  emojis = require('node-emoji');
} catch (_) {
  emojis = false;
}

var EMOJI_REGEX = /(:[a-z_]+:)/g;

var SPACE = ' ';

function emojify(str) {
  if (str && str.length && emojis !== false) {
    var emojifier = emojis.get.bind(emojis);
    var replacer = function (k) {
      return emojifier(k) + SPACE;
    };
    str = str.replace(EMOJI_REGEX, replacer);
  }
  return str;
}

module.exports = emojify;
