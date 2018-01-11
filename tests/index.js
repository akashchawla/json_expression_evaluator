/*jshint multistr:true, node:true, esversion:6, mocha:true*/
'use strict';

const G = require('../globals'),
      utiliTyTests = require('./utilityTests'),
      evaluatorTests = require('./evaluatorTests'),
      classifierTests = require('./classifierTests'),
      parserTests = require('./parserTests');

describe('Application Test Suite', function(){

        it('should run the application successfully', function(done){
            let app = new (require('../app'))('input.csv', 'output.csv');
            
                    app.initialize()
                        .then(function(){
                            it.should.assert('Application runned without any error');
                            done();
                        });  
        });

        it('should not run the application successfully if input path is not present', function(done){
            let app = new (require('../app'))(undefined, 'output.csv');
            
                    app.initialize()
                        .catch(function(err){
                            it.should.assert('Application returned with an error');
                            err.message.should.be.equal('Invalid/Missing input or output file path');
                            done();
                        });  
        });
});


describe('Module-wise Test suite', function(){
    utiliTyTests();
    evaluatorTests();
    classifierTests();
    parserTests();
});