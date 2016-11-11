'use strict';
var rjs = require('requirejs'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

rjs.config({baseUrl: '.', nodeRequire: require});
global.requirejs = rjs;

chai.use(chaiAsPromised);
chai.should();
