var tapDebug = require('./src/tap-debug');

var defaultLog = console.log.bind(console)

module.exports = tapDebug(defaultLog, { stringifyValue: true })
