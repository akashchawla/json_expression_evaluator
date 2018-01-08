/*jshint multistr:true, node:true, esversion:6*/
'use strict';

const constants = require('../constants'),
      G = require('../globals'),
      _ = require('lodash'),
      utility = G.Utility;

/** 
 * This class handles the responsibility of parsing the tokens and lexemes to evaluate the value of expression
*/
class Parser{

    /**
     * Constructor of the class
     * @param {Object} lexemeTokens : Map of lexemes : tokens
     * @param {Array} lexemes : list of lexemes
     */
    constructor(lexemeTokens, lexemes){
        this.lexemeTokens = lexemeTokens;
        this.lexemes = lexemes;
    }

    /**
     * This method validates the lexemeTokens and checks if left paranthesis is
     * equal to right paranthesis
     */
    checkIfBalancedExpression(){
        let self = this;
        let tokens = _.values(self.lexemeTokens);

        let paranthesisTokens = _.filter(tokens, function(token){
            return token.type === constants.LEXEME_TYPES.PARANTHESIS;
        });

        let leftParanthesis = _.filter(paranthesisTokens, function(token){
            return token.isLeftParanthesis;
        });

        let rightParanthesis = _.difference(paranthesisTokens, leftParanthesis);

        let isValid = rightParanthesis.length === leftParanthesis.length;

        if(isValid){
            leftParanthesis.forEach(function(lp){
                isValid = isValid && rightParanthesis.some(function(rp){
                    return rp.positionIndex > lp.positionIndex;
                });
            });
        }
        return isValid;
    }

    /**
     * This method parse each lexeme-token and replaces it values in the expression
     * In the final step we have utilitised the Javascript's in-built eval() method to evaluate resultant expression
     */
    parseTokenToEvaluate(){
        let self = this;
        let expression = [];
        let lexemeIndexEvaluated = [];

        //Creating a base Javascript expression to evaluate
        for(let i = 0; i < self.lexemes.length; i++){
            let lexeme = self.lexemes[i];
            let lexemeToken = self.lexemeTokens[lexeme];
            expression.push(lexemeToken.value);   
        }

        let expressionToEval = expression.join(' ');
        let evaluationResult = eval(expressionToEval);

        utility.logMessage('Expression: ' + expressionToEval + ' Result: '+ evaluationResult, constants.LOG_LEVELS.VERBOSE);

        return evaluationResult;
    }
}

module.exports = Parser;