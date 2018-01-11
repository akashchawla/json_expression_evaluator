/*jshint multistr:true, node:true, esversion:6, mocha:true*/
'use strict';

const Evaluator = require('../evaluator'),
     Classifier = require('../evaluator/classifier'),
     constants = require('../constants');

var classifierTest = function(){

    
    describe('Classifier class methods Test Suite', function(){
        let classifierInstance,jsonObject;
        let evaluator = new Evaluator();
        it('should created lexemeTokens successfully', function(){
            let expression = "$prop1 == 'king'";
            let jsonData = '{"prop1":"akash","prop2":{"x":100.0},"prop3":[{"inner_prop":4}]}';

           

            jsonObject = JSON.parse(jsonData);
            classifierInstance = new Classifier(evaluator._createLexemes(expression));

            let lexemeTokens = classifierInstance.classifyTokens(jsonObject);
            console.log(JSON.stringify(lexemeTokens));
            lexemeTokens.should.match(function(it){
                return it.should.be.an.Array;
            });
        });

        it('should created paranthesis, literal, numeric, identifier, operator lexemeTokens successfully', function(){
            let expression = "( $prop1 == 'akash' AND $prop2.x == 100.0 ) OR $prop3.0.inner_prop == 4";
            let jsonData = '{"prop1":"akash","prop2":{"x":100.0},"prop3":[{"inner_prop":4}]}';

            jsonObject = JSON.parse(jsonData);
            classifierInstance = new Classifier(evaluator._createLexemes(expression));

            let lexemeTokens = classifierInstance.classifyTokens(jsonObject);
            lexemeTokens.should.match(function(it){
                return it.should.be.an.Array;
            });

            lexemeTokens.some(function(token){
                return token.type === constants.LEXEME_TYPES.IDENTIFIER;
            }).should.be.true();

            lexemeTokens.some(function(token){
                return token.type === constants.LEXEME_TYPES.LITERALS;
            }).should.be.true();

            lexemeTokens.some(function(token){
                return token.type === constants.LEXEME_TYPES.PARANTHESIS;
            }).should.be.true();

            lexemeTokens.some(function(token){
                return token.type === constants.LEXEME_TYPES.OPERATORS;
            }).should.be.true();

            lexemeTokens.some(function(token){
                return token.type === constants.LEXEME_TYPES.INVALID;
            }).should.be.false();
        });

        it('should create invalid lexemeTokens if non-grammar lexeme is present', function(){
            let expression = "$prop3.0.inner_prop != 4";
            let jsonData = '{"prop1":"akash","prop2":{"x":100.0},"prop3":[{"inner_prop":4}]}';

            jsonObject = JSON.parse(jsonData);
            classifierInstance = new Classifier(evaluator._createLexemes(expression));

            let lexemeTokens = classifierInstance.classifyTokens(jsonObject);
            lexemeTokens.should.match(function(it){
                return it.should.be.an.Array;
            });

            lexemeTokens.some(function(token){
                return token.type === constants.LEXEME_TYPES.INVALID;
            }).should.be.true();
        });
    });
};

module.exports = classifierTest;