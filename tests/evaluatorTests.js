/*jshint multistr:true, node:true, esversion:6,mocha:true*/
'use strict';

const Evaluator = require('../evaluator');

var evaluatorTest = function(){

    describe('Evaluator class methods Test Suite', function(){
        let evaluatorInstance = new Evaluator();
        describe('createLexmes method test cases', function(){
        

            it('should create expected number of lexemes successfully', function(){
                let lexemes = evaluatorInstance._createLexemes('$x == 2');
                lexemes.should.match(function(it){
                    return it.should.be.Array();
                });
                lexemes.length.should.equal(3);
            });

            it('should create 0 lexemes if expression is undefined', function(){
                let lexemes = evaluatorInstance._createLexemes();
                lexemes.should.match(function(it){
                    return it.should.be.Array();
                });
                lexemes.length.should.equal(0);
            });

            it('should create 0 lexemes if expression is contains only white-spaces', function(){
                let lexemes = evaluatorInstance._createLexemes('      ');
                lexemes.should.match(function(it){
                    return it.should.be.Array();
                });
                lexemes.length.should.equal(0);
            });

            it('should create expected number of lexemes even if given expression is contains extra white-spaces in between', function(){
                let lexemes = evaluatorInstance._createLexemes('$x   ==    2');
                lexemes.should.match(function(it){
                    return it.should.be.Array();
                });
                lexemes.length.should.equal(3);
            });
        });

        describe('evaluate method test cases', function(){

            it('should evaluate a valid expression and a valid json to true, if expression identifier is equal to literal', function(){
                let result = evaluatorInstance.evaluate('$x == 2','{"x":2}');
                result.should.be.true();
            });

            it('should evaluate a valid expression and a valid json to false, if expression identifier is NOT equal to literal', function(){
                let result = evaluatorInstance.evaluate('$x == 3','{"x":2}');
                result.should.not.be.true();
            });

            it('should return false if invalid json is passed', function(){
                let result = evaluatorInstance.evaluate('$x == 3','{"x":2, "y"}');
                result.should.not.be.true();
            });

            it('should return false if undefined or empty expression is passed', function(){
                let result = evaluatorInstance.evaluate('','{"x":2, "y"}');
                result.should.not.be.true();
            });

            it('should return false if invalid grammer expression is passed', function(){
                let result = evaluatorInstance.evaluate('$x != 3','{"x":2, "y"}');
                result.should.not.be.true();
            });

            it('should return false if unbalanced expression is passed', function(){
                let result = evaluatorInstance.evaluate('( $x == 3 ) and $y == 10 )','{"x":2, "y": 10}');
                result.should.not.be.true();
            });

        });

    });
};

module.exports = evaluatorTest;