/*jshint multistr:true, node:true, esversion:6*/
'use strict';

const _ = require('lodash'),
      G = require('../globals'),
      utility = G.Utility,
      Classifier = require('./classifier'),
      Parser = require('./parser');
/**
 * This class comprises of the core logical components of the problem statement
 */
class Evaluator{

    /**
     * This method evaluates the expression on the basis of the jsonData
     * Logic of the method is mentioned below
     * @param {*} expression : Query expression string
     * @param {*} jsonData : Json Data input
     */
    evaluate(expression, jsonData){
        let self = this;
        /* 
        LOGIC:
        1. Validate if expression and jsonData is valid
        2. Create lexemes out of the expression, In order to do so split the expression on while spaces
        3. Classify each lexeme into a token class by looking into the symbol table
        4. Pass these tokens to a parser, which will evaluate the expression and returns the result
        */

        if(!_.isEmpty(expression) && utility.isJsonString(jsonData)){
            let jsonObject = JSON.parse(jsonData);
            
            let lexemes = self._createLexemes(expression);

            //Checking if no lexemes are there
            if(lexemes.length === 0){
                return false;
            }

             //Treating these modules as abstract classes
            let classifier = new Classifier(lexemes);
            let lexemTokens = classifier.classifyTokens(jsonObject);

             //Passing the tokens and lexems to the Parser for evaluating the expression result
            let parser = new Parser(lexemTokens);
            if(!parser.checkIfAnyInvalidGrammarLexeme() && parser.checkIfBalancedExpression()){
                return parser.parseTokenToEvaluate(); 
            }else{
                return false;
            } 
        }else{
            return false;
        }
    }

    /**
     * This method takes in the expression and create lexemes out of it
     * @param {string} expression e.g. $mattress.name == 'king' AND $cost == 100.0
     */
    _createLexemes(expression){

        expression = expression || '';
        //Getting lexemes out of the expression
        let lexemes = expression.split(' ');
        
        //Filtering the lexemes which are empty strings
        lexemes = _.filter(lexemes, function(lexeme){
            return !_.isEmpty(lexeme.trim());
        });

        return lexemes;
    }    
}

module.exports = Evaluator;