'use strict';

var generateTapDebug = require('..');

var stringify = require('../src/stringify');
var extend = require('../src/utils').extend;

describe('tap-debug module', function () {

  it('should be a function', function () {
    generateTapDebug.should.be.a.function;
  });

  describe('tapDebug', function () {

    var tapDebug, spy;
    beforeEach(function () {
      spy = sinon.spy();
      tapDebug = generateTapDebug(spy, { colorify: false });
    });

    it('should be a function', function () {
      tapDebug.should.be.a.function;
    });

    describe('see', function () {

      it('should be a function', function () {
        var see = tapDebug();

        see.should.be.a.function;
      });

      it('should log a message', function () {
        var message = 'the-prefix-message';
        var obj = {
          a: 1,
          b: 2,
          c: 3
        };

        var see = tapDebug(message);
        see(obj);

        spy.should.have.been.calledWith(message);
      });

      it('should support variables in messages', function () {
        var message = 'there are ${beers} beers';

        var see = tapDebug(message);
        see({
          beers: 5
        });

        spy.should.have.been.calledWith('there are 5 beers');
      });

      it('should support emojis in messages', function () {
        var prefixMessage = 'have a :beer:';

        var see = tapDebug(prefixMessage);
        see();

        spy.should.have.been.calledWith('have a 🍺 ');
      });

      it('should be able to enable stringification and log some data prefixed by a message', function () {
        var enabledStringify = generateTapDebug(spy, { stringifyObjects: true });

        var prefixMessage = 'the-prefix-message';
        var obj = {
          a: 1,
          b: 2,
          c: 3
        };
        var newObj = extend({}, obj);

        var see = enabledStringify(prefixMessage);
        see(obj);

        spy.should.have.been.calledWith(prefixMessage + ': ' + stringify(newObj));
      });

      it('should enable stringification if no prefixMessage is passed in', function () {
        var noStringify = generateTapDebug(spy);

        var obj = {
          a: 1,
          b: 2,
          c: 3
        };
        var newObj = extend({}, obj);

        var see = noStringify();
        see(obj);

        spy.should.have.been.calledWith(stringify(newObj));
      });

      it('should be able to enable stringification and log some data prefixed by a message and separator', function () {
        var enabledStringify = generateTapDebug(spy, { stringifyObjects: true });

        var prefixMessage = 'the-prefix-message';
        var separator = ' - ';
        var obj = {
          a: 1,
          b: 2,
          c: 3
        };
        var newObj = extend({}, obj);

        var see = enabledStringify(prefixMessage, { stringifyObjectsSeparator: separator });
        see(obj);

        spy.should.have.been.calledWith(prefixMessage + separator + stringify(newObj));
      });

    });

  });

});
