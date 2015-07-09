'use strict';

var debug = require('debug')('icebox:checker');
var see = require('.')(debug);

var Promise = require('bluebird');

var checkIcebox = function () {
  return Promise.resolve({
    plum: 0
  });
};

function checkIceboxForPlums() {
  var hasPlums = function(icebox) {
    return icebox.plum > 0;
  };

  return checkIcebox('plum').
         tap(see(':speak_no_evil: There are ${plum} plums in the icebox.')).
         then(hasPlums);
}

checkIceboxForPlums().then(function (hasPlums) {
  if (!hasPlums) {
    debug('Forgive me ' +
    'they were delicious ' +
    'so sweet ' +
    'and so cold');
  }
});
