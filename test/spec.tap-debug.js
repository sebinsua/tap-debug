'use strict';

var generateTapDebug = require('..');

describe('tap-debug module', function () {

  it('should be a function', function () {
    generateTapDebug.should.be.a.function;
  });

  describe('tapDebug', function () {

    var tapDebug, spy;
    beforeEach(function () {
      spy = sinon.spy();
      tapDebug = generateTapDebug(spy);
    });

    it('should be a function', function () {
      tapDebug.should.be.a.function;
    });

    describe('see', function () {

      it('should be a function', function () {
        var see = tapDebug();

        see.should.be.a.function;
      });

      it('should log some data prefixed by a message', function () {
        var prefixMessage = 'the-prefix-message';
        var obj = {
          a: 1,
          b: 2,
          c: 3
        };

        var see = tapDebug(prefixMessage);
        see(obj);

        spy.should.have.been.calledWith(prefixMessage + JSON.stringify(obj, null, 2));
      });

      it('should log some data prefixed by a message and separator', function () {
        var prefixMessage = 'the-prefix-message';
        var separator = ' : ';
        var obj = {
          a: 1,
          b: 2,
          c: 3
        };

        var see = tapDebug(prefixMessage, separator);
        see(obj);

        spy.should.have.been.calledWith(prefixMessage + separator + JSON.stringify(obj, null, 2));
      });

      it('should be able to disable stringification of the objects passed in', function () {
        var disabledStringify = generateTapDebug(spy, { stringifyObjects: false });

        var prefixMessage = 'the-prefix-message';
        var obj = {
          a: 1,
          b: 2,
          c: 3
        };

        var see = disabledStringify(prefixMessage);
        see(obj);

        spy.should.have.been.calledWith(prefixMessage);
      });

    });

  });

});
