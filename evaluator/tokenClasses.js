/*jshint multistr:true, node:true, esversion:6*/
'use strict';

/**
 * This file contains all the classes for the Symbols created by the tokenizers 
 * to map them to a specific token class using a look-up symbol table
 */
const _ = require('lodash'),
      utility = new (require('../utility'))(),
      constants = require('../constants');

/**
 * Base class for each lexeme token
 */
class BaseToken{
    constructor(lexeme, value, type, positionIndex){
        this.lexeme = lexeme;
        this.value = value;
        this.type = type;
        this.positionIndex = positionIndex;
    }
}

/**
 * Class for Identifiers such as $cost, $mattress.size , $results.0.type
 */
class Identifier extends BaseToken{
    constructor(lexeme, positionIndex, jsonObject){
        let objectPath = lexeme.slice(1).split('.');
        let value = _.get(jsonObject, objectPath, null);
        value = utility.getTypeCastValue(value);
        super(lexeme, value , constants.LEXEME_TYPES.IDENTIFIER, positionIndex);
    }
}

/* Literals declaration Begins*/

/**
 * Base class for all Literals
 */
class Literals extends BaseToken{
    constructor(lexeme, value, positionIndex){
        super(lexeme, value, constants.LEXEME_TYPES.LITERALS, positionIndex);
    }
}

/**
 * Class for String literals
 */
class StringLiteral extends Literals{
    constructor(lexeme, positionIndex){
        super(lexeme, lexeme, positionIndex);
    }
}

/**
 * Class for Boolean Literals
 */
class BooleanLiteral extends Literals{
    constructor(lexeme, positionIndex){
        let value = lexeme.toLowerCase() === 'true';
        super(lexeme, value, positionIndex);
    }
}

/**
 * Class for Decimal Literals
 */
class DecimalLiteral extends Literals{
    constructor(lexeme, positionIndex){
        let value = !isNaN(Number(lexeme)) ? Number(lexeme) : 0.00;
        super(lexeme, value, positionIndex);
    }
}

/**
 * Class for Interger Literals
 */
class IntegerLiteral extends Literals{
    constructor(lexeme, positionIndex){
        let value = !isNaN(Number(lexeme)) ? Number(lexeme) : 0;
        super(lexeme, value, );
    }
}

/* Literals declaration Ends*/


/* Operators declaration Begins*/

/**
 * Base class for all Operators
 */
class Operators extends BaseToken{
    constructor(lexeme, value, positionIndex){
        super(lexeme, value, constants.LEXEME_TYPES.OPERATORS, positionIndex);
    }
}

/**
 * Class for AND operator
 */
class AndOperator extends Operators{
    constructor(lexeme, positionIndex){
        super(lexeme, '&&', positionIndex);
    }
}

/**
 * Class for OR operator
 */
class OrOperator extends Operators{
    constructor(lexeme, positionIndex){
        super(lexeme, '||', positionIndex);
    }
}

/**
 * Class for NOT operator
 */
class NotOperator extends Operators{
    constructor(lexeme, positionIndex){
        super(lexeme, '!', positionIndex);
    }
}

/**
 * Class for EQUALS(==) operator
 */
class EqualsOperator extends Operators{
    constructor(lexeme, positionIndex){
        super(lexeme, '===', positionIndex);
    }
}

/**
 * Class for EXISTS operator
 */
class ExistsOperator extends Operators{
    constructor(lexeme, positionIndex){
        super(lexeme, '!!', positionIndex);
    }
}

/* Operators declaration Ends*/


/* Paranthesis declaration Begins*/

/**
 * Base class for parenthesis
 */
class Paranthesis extends BaseToken{
    constructor(lexeme, value, positionIndex){
        super(lexeme, value,constants.LEXEME_TYPES.PARANTHESIS, positionIndex);
        // Identifier for paranthesis type
        this.isLeftParanthesis = value === '(';
    }

    checkIfLeftParanthesis(){
        return this.isLeft;
    }
}

/**
 * Class for left parenthesis
 */
class LeftParanthesis extends Paranthesis{
    constructor(lexeme, positionIndex){
        super(lexeme, '(', positionIndex);
    }
}

/**
 * Class for Right parenthesis
 */
class RightParanthesis extends Paranthesis{
    constructor(lexeme, positionIndex){
        super(lexeme, ')', positionIndex);
    }
}
/* Paranthesis declaration Ends*/

/**
 * Lookup Map (synonym to symbol-table) to classify lexemes into tokens
 */
const tokenClasses = {
    "IDENTIFIER" : {
        regex : constants.REGEX.IDENTIFIER,
        instantiateClass : Identifier
    },
    "STRING_LITERAL" : {
        regex : constants.REGEX.STRING_VALUE,
        instantiateClass : StringLiteral
    },
    "BOOLEAN_LITERAL" : {
        regex : constants.REGEX.BOOLEAN_VALUE,
        instantiateClass : BooleanLiteral
    },
    "DECIMAL_LITERAL" :{
        regex : constants.REGEX.DECIMAL_VALUE,
        instantiateClass : DecimalLiteral
    },
    "INTEGER_LITERAL" :{
        regex : constants.REGEX.INTEGER_VALUE,
        instantiateClass : IntegerLiteral
    },
    "AND_OPERATOR" :{
        regex : constants.REGEX.AND_OPERATOR,
        instantiateClass : AndOperator
    },
    "OR_OPERATOR" : {
        regex : constants.REGEX.OR_OPERATOR,
        instantiateClass : OrOperator
    },
    "NOT_OPERATOR" : {
        regex : constants.REGEX.NOT_OPERATOR,
        instantiateClass : NotOperator
    },
    "EQUALS_OPERATOR" : {
        regex : constants.REGEX.EQUALS_OPERATOR,
        instantiateClass : EqualsOperator
    },
    "EXISTS_OPERATOR" : {
        regex : constants.REGEX.EXISTS_OPERATOR,
        instantiateClass : ExistsOperator
    },
    "LEFT_PARATHESIS" : {
        regex : constants.REGEX.LEFT_PARANTHESIS,
        instantiateClass : LeftParanthesis    
    },
    "CLOSE_PARENTHESIS" : {
        regex : constants.REGEX.RIGHT_PARANTHESIS,
        instantiateClass : RightParanthesis
    }
};

module.exports = tokenClasses;