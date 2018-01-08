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
     * Constructor of the class
     * @param {String} expression 
     * @param {String} jsonData 
     */
    constructor(expression, jsonData){
        this.expression = expression;
        this.jsonData = jsonData;
    }

    /**
     * This method evaluates the expression on the basis of the jsonData
     * Logic of the method is mentioned below
     */
    evaluate(){
        let self = this;
        /* 
        LOGIC:
        1. Validate if expression and jsonData is valid
        2. Create lexemes out of the expression, In order to do so split the expression on while spaces
        3. Classify each lexeme into a token class by looking into the symbol table
        4. Pass these tokens to a parser, which will evaluate the expression and returns the result
        */

        if(!_.isEmpty(self.expression) && utility.isJsonString(self.jsonData)){
            let jsonObject = JSON.parse(self.jsonData);
            //Getting lexemes out of the expression
            let lexemes = self.expression.split(' ');
        
            //Filtering the lexemes which are empty strings
            lexemes = _.filter(lexemes, function(lexeme){
                return !_.isEmpty(lexeme.trim());
            });
             //Treating these modules as abstract classes
            let classifier = new Classifier(lexemes);
            let lexemTokens = classifier.classifyTokens(jsonObject);

             //Passing the tokens and lexems to the Parser for evaluating the expression result
            let parser = new Parser(lexemTokens, lexemes);
            if(parser.checkIfBalancedExpression()){
                return parser.parseTokenToEvaluate(); 
            }else{
                return false;
            } 
        }else{
            return false;
        }
    }

    
}

module.exports = Evaluator;