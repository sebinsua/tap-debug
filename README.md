# tap-debug
:beer: Debug on tap.

```javascript
var debug = require('debug')('app:feature');
var see = require('tap-debug')(debug);

var getAccount = require('./account').get;

function getFormattedAccount(id) {
  var format = function (accountData) {
    // Lets pretend this does something.
    return accountData;
  };

  return getAccount(id).
         tap(see('account#get responded with: ')).
         then(format).
         tap(see('#getFormattedAccount responded with: '));  
}

```

## TODO

- [ ] Write some tests.
- [ ] String interpolation on the prefix message. Consider use and potential expansion of [es6-templates](https://github.com/esnext/es6-templates). 
- [ ] Color in the the values that are logged, using a similar approach to the one used within [ramda-debug](https://github.com/sebinsua/ramda-debug).
- [ ] Consider the influence of the aforementioned library. Is there any crossover?
- [ ] Quickly and easily switch on/off the logging of the object passed in.
- [ ] Should we [indent any object output](https://github.com/sindresorhus/indent-string)?
- [ ] Publish.
