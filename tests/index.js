'use strict';

const G = require('../globals'),
      utiliTyTests = require('./utilityTests'),
      evaluatorTests = require('./evaluatorTests'),
      classifierTests = require('./classifierTests'),
      parserTests = require('./parserTests');

describe('Application Test Suite', function(){

        let app = new (require('../app'))('input.csv', 'output.csv');

        app.initialize()
            .then(function(){
               
            }).catch(function(){
            });        
});

describe('Module-wise Test suite', function(){
    utiliTyTests();
    evaluatorTests();
    classifierTests();
    parserTests();
});