# tap-debug [![Build Status](https://travis-ci.org/sebinsua/tap-debug.png)](https://travis-ci.org/sebinsua/tap-debug) [![npm version](https://badge.fury.io/js/tap-debug.svg)](https://www.npmjs.com/package/tap-debug)
> :beer: Debug on tap.

```javascript
var debug = require('debug')('app:feature');
var see = require('tap-debug')(debug);

var checkIcebox = require('./icebox').get;

function checkIceboxForPlums() {
  return checkIcebox('plum').
         tap(see('There are ${plum} plums in the icebox'));
}

```

## TODO

- [x] String interpolation on the prefix message. Consider use and potential expansion of [es6-templates](https://github.com/esnext/es6-templates) or [this library](https://github.com/medikoo/es6-template-strings). Consider support for [emojis](https://github.com/omnidan/node-emoji).
- [ ] Color in the the values that are logged, using a similar approach to the one used within [ramda-debug](https://github.com/sebinsua/ramda-debug).
- [ ] Consider the influence of the aforementioned library. Is there any crossover?
- [ ] Should we [indent any object output](https://github.com/sindresorhus/indent-string)?
