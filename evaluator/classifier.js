/*jshint multistr:true, node:true, esversion:6*/
'use strict';

const _ = require('lodash');

/**
 * This class handles the responsibility of classifying lexemes into specific token classes
 */
class Classifier{
    /**
     * Constructor of the class
     * @param {Array} lexemes 
     */
    constructor(lexemes){
        this.lexemes = lexemes;
        this.tokenClasses = require('./tokenClasses');
    }

    /**
     * This method iterates over the lexemes, match each one of the them to symbol look-up map
     * and set the attributes of the tokens
     * @param {Object} jsonObject - Inputed jsonObject by the user
     */
    classifyTokens(jsonObject){
        let self = this;
        //Classiying lexemes into token classes
    
        let lexeme_tokenClass_list = [];
    
        //Iterating over each lexeme
        self.lexemes.forEach(function(lexeme, index){
            
            //Iterating over each tokenClass to match with the best symbol class
            _.keys(self.tokenClasses).forEach(function(tokenClass){
                var tokenCl = self.tokenClasses[tokenClass];

                //If matched then set the entry in a map which has key = lexeme and value = token
                //and breaks the inner-loop via return
                if(tokenCl.regex.test(lexeme)){
                    let tokenInstance = new tokenCl.instantiateClass(lexeme, index, jsonObject);
                    lexeme_tokenClass_list.push(tokenInstance);
                    return;
                }
            });
            
        });
    
        return lexeme_tokenClass_list;
    }
}

module.exports = Classifier;