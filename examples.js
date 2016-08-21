#!/usr/bin/env node

'use strict';

var Promise = require('bluebird'),
    shall = require('promise-shall');

var debug = require('debug')('icebox:checker');
var see = require('.')(debug);
var seeBasicConsole = require('./see')

var checkIcebox = function () {
  return Promise.resolve({
    plum: Math.round(Math.random() * 1),
    apple: Math.floor(Math.random() * 10),
    orange: Math.floor(Math.random() * 10)
  });
};

function checkIceboxForPlums() {
  var hasPlums = function(icebox) {
    return icebox.plum > 0;
  };

  return checkIcebox('plum').
         tap(see(':speak_no_evil: There are ${plum} plums in the icebox')).
         then(hasPlums).
         tap(function (hp) {
          if (!hp) {
            see.debug([
              'Forgive me',
              'they were delicious',
              'so sweet',
              'and so cold'
            ]);
          }
        });
}

function checkIceboxForApples() {
  var isNotZero = function (o) {
    return o.apple !== 0;
  };

  return checkIcebox().
         tap(see.ifElse(isNotZero, 'There are ${apple} apples', 'There are no apples'));
}

function checkIceboxForOranges() {
  var orangeState = function (o) {
    if (o.orange > 5) {
      return 'more-than-five';
    }
    if (o.orange < 2) {
      return 'less-than-two';
    }
    return 'between-two-and-five';
  };

  return checkIcebox().
         tap(see.switchCase(orangeState, {
           'more-than-five': 'There are more than five oranges',
           'less-than-two': 'There are less than two oranges. ${orange} to be exactly!',
           'between-two-and-five': 'There are ${orange} oranges in the icebox'
         }));
}

checkIceboxForPlums().then(shall(checkIceboxForApples)).
                      then(shall(checkIceboxForOranges));

seeBasicConsole('print the object passed in')({ what: 'null' })
seeBasicConsole('print the number passed in')(12)
seeBasicConsole('print the string passed in')('holy moly')
