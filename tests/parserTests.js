/*jshint multistr:true, node:true, esversion:6,mocha:true*/
'use strict';

const Parser = require('../evaluator/parser');

let parserTest = function(){

    describe('Parser class methods Test Suite', function(){

       describe('checkIfAnyInvalidGrammarLexeme() test cases', function(){

            it('should return true if invalid lexeme is present' , function(){

                let lexemeTokens = [{"lexeme":"$prop1","value":"'akash'","type":"identifier","positionIndex":0},
                {"lexeme":"!=","value":"!=","type":"invalid","positionIndex":1},
                {"lexeme":"'king'","value":"'king'","type":"literals","positionIndex":2}];

                let parserInstance = new Parser(lexemeTokens);
                parserInstance.checkIfAnyInvalidGrammarLexeme().should.be.true();

            });

            it('should return false if no invalid lexeme is present' , function(){
                
                let lexemeTokens = [{"lexeme":"$prop1","value":"'akash'","type":"identifier","positionIndex":0},
                {"lexeme":"==","value":"===","type":"operators","positionIndex":1},
                {"lexeme":"'king'","value":"'king'","type":"literals","positionIndex":2}];

                let parserInstance = new Parser(lexemeTokens);

                parserInstance.checkIfAnyInvalidGrammarLexeme().should.be.false();
            });
       });

       describe('checkIfBalancedExpression() test cases', function(){
        
            it('should return true if parathesis lexemes are balanced' , function(){

                let lexemeTokens = [{"lexeme":"(","value":"(","type":"paranthesis","positionIndex":0, "isLeftParanthesis": true},
                {"lexeme":"==","value":"===","type":"operators","positionIndex":1},
                {"lexeme":")","value":")","type":"paranthesis","positionIndex":2, "isLeftParanthesis": false}];

                let parserInstance = new Parser(lexemeTokens);
                parserInstance.checkIfBalancedExpression().should.be.true();

            });

            it('should return true if no parathesis lexemes are balanced' , function(){
                
                let lexemeTokens = [{"lexeme":"$prop1","value":"'akash'","type":"identifier","positionIndex":0},
                {"lexeme":"!=","value":"!=","type":"invalid","positionIndex":1},
                {"lexeme":"'king'","value":"'king'","type":"literals","positionIndex":2}];

                let parserInstance = new Parser(lexemeTokens);
                parserInstance.checkIfBalancedExpression().should.be.true();
                
            });

            it('should return false if paranthesis lexemes are not balanced' , function(){
                
                let lexemeTokens = [{"lexeme":")","value":")","type":"paranthesis","positionIndex":0, "isLeftParanthesis": false},
                {"lexeme":"==","value":"===","type":"operators","positionIndex":1},
                {"lexeme":"(","value":"(","type":"paranthesis","positionIndex":2, "isLeftParanthesis": true}];

                let parserInstance = new Parser(lexemeTokens);

                parserInstance.checkIfBalancedExpression().should.be.false();
            });
        });

        describe('parseTokenToEvaluate() test cases', function(){
            
            it('should return true if expression lexemes forms a true valued expression' , function(){

                let lexemeTokens = [{"lexeme":"(","value":"(","type":"paranthesis","positionIndex":0, "isLeftParanthesis": true},
                {"lexeme":"$x","value":"10","type":"identifier","positionIndex":1},
                {"lexeme":"==","value":"===","type":"operators","positionIndex":2},
                {"lexeme":"10","value":"10","type":"literal","positionIndex":3},
                {"lexeme":")","value":")","type":"paranthesis","positionIndex":4, "isLeftParanthesis": false}];

                let parserInstance = new Parser(lexemeTokens);
                parserInstance.parseTokenToEvaluate().should.be.true();

            });

            it('should return false if expression lexemes forms a false valued expression' , function(){
                
                let lexemeTokens = [{"lexeme":"$prop1","value":"'akash'","type":"identifier","positionIndex":0},
                {"lexeme":"==","value":"===","type":"invalid","positionIndex":1},
                {"lexeme":"'king'","value":"'king'","type":"literals","positionIndex":2}];

                let parserInstance = new Parser(lexemeTokens);
                parserInstance.parseTokenToEvaluate().should.be.false();
                
            });

            it('should return false if invalid expression is formulated' , function(){
                
                let lexemeTokens = [{"lexeme":"$prop1","value":"'akash'","type":"identifier","positionIndex":0},
                {"lexeme":"==","value":"=!=","type":"invalid","positionIndex":1},
                {"lexeme":"'king'","value":"'king'","type":"literals","positionIndex":2}];

                let parserInstance = new Parser(lexemeTokens);
                parserInstance.parseTokenToEvaluate().should.be.false();
                
            });
        });

    });
};

module.exports = parserTest;