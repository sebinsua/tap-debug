# tap-debug [![Build Status](https://travis-ci.org/sebinsua/tap-debug.png)](https://travis-ci.org/sebinsua/tap-debug) [![npm version](https://badge.fury.io/js/tap-debug.svg)](https://www.npmjs.com/package/tap-debug)
> :beer: Debug on tap.

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

![Example](http://i.imgur.com/WkG5T1N.png)
