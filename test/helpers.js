'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

global.should = chai.should();
global.expect = chai.expect;
global.sinon = sinon;
