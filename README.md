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
- [ ] String interpolation on the prefix message.
- [ ] Color in the the messages that are logged.
- [ ] Quickly and easily switch on/off the logging of the object passed in.
- [ ] Publish.
