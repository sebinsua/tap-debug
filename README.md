# tap-debug [![Build Status](https://travis-ci.org/sebinsua/tap-debug.png)](https://travis-ci.org/sebinsua/tap-debug) [![npm version](https://badge.fury.io/js/tap-debug.svg)](https://www.npmjs.com/package/tap-debug)
> :beer: Debug on tap.

## Why?

Helps afford the creation of [data-driven, narrative user journeys, aka. log level 'human'](https://twitter.com/sebinsua/status/545330195075715072).

- [x] Plays nicely with the `tap()` method of your promises and functional pipelines.
- [x] [ES6-style variable interpolation](https://github.com/medikoo/es6-template-strings) built in.
- [x] Colored output makes it easy to spot variables and their values. 
- [x] :v::ok_hand::heart_eyes: Emojis :raised_hands::fire::star2:

## Example

![Example](http://i.imgur.com/WkG5T1N.png)

```javascript
'use strict';

var debug = require('debug')('icebox:checker');
var see = require('tap-debug')(debug);

var checkIcebox = require('./icebox').get;

function checkIceboxForPlums() {
  var hasPlums = function(icebox) {
    return icebox.plum > 0;
  };

  return checkIcebox('plum').
         tap(see(':speak_no_evil: There are ${plum} plums in the icebox.')).
         then(hasPlums);
}
```

See these [examples](https://github.com/sebinsua/tap-debug/blob/master/examples.js) for further usage instructions.

## API

### `require('tap-debug')(debugFn, options)`

Takes a `debugFn` such as [visionmedia/debug](https://github.com/visionmedia/debug) and a configuration `options` object.

```javascript
{
  stringifyObjects: false,
  stringifyObjectsFormatter: 'inspect',
  emojify: true,
  colorify: true
}
```

#### `tapDebug(message[, options])(object)`

A curried `tap()`able version of the debugger.

*See above for a working example.*

##### `.debug(message[, object, options])`

A ternary version of the curried `tap()`able version of the debugger.

```javascript
var see = require('tap-debug')();
see.debug('hello there');
```

##### `.ifElse(predicate, ifMessage, elseMessage[, options])(object)`

A curried `tap()`able version of the debugger, which will switch its message depending on whether the `predicate` function supplied returns `true` or `false` on being called with the `object`.

```javascript
var see = require('tap-debug')();
// ...
promise.tap(see.ifElse(isNull, 'This promise was null', 'This promise was not null.'));
```

##### `.switchCase(getCase, caseMessages[, options])(object)`

A curried `tap()`able version of the debugger, which can switch its message depending on whether the `getCase` function supplied returns a key which matches a message in `caseMessages` on being called with the `object`.

```javascript
var see = require('tap-debug')();
// ...
promise.tap(see.switchCase(getCase, {
  'case-one': 'This is the first message.',
  'case-two': 'This is the second message.',
  'default': 'This is the default message.'
}));
```
