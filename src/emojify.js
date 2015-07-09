'use strict';

var emojis;
try {
  emojis = require('node-emoji');
} catch (_) {
  emojis = false;
}

var EMOJI_REGEX = /(:[a-z_]+:)/g;

function emojify(str) {
  if (str && emojis !== false) {
    var replacer = emojis.get.bind(emojis);
    str = str.replace(EMOJI_REGEX, replacer);
  }
  return str;
}

module.exports = emojify;
