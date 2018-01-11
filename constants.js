/*jshint multistr:true, node:true, esversion:6*/
'use strict';

/**
 * This file contains all the constants referred in the application
 */
var constants = {
    /**
     * Lookup of application log-levels
     */
    LOG_LEVELS : {
        INFO : 'info',
        VERBOSE : 'verbose',
        ERROR : 'error'
    },
    /**
     * Lookup of regex used in application
     */
    REGEX : {
        FILE_PATH : /^\S*$/,
        BOOLEAN_VALUE : /^(true|false)$/i,
        DECIMAL_VALUE : /^[0-9]*\.+[0-9]*$/,
        INTEGER_VALUE : /^[0-9]*$/,
        STRING_VALUE : /^'.*'$/,
        IDENTIFIER : /^[$][a-zA-Z0-9_]*?(\.[a-zA-Z0-9_]{1,})*$/,
        AND_OPERATOR : /^(AND)$/i,
        OR_OPERATOR : /^(OR)$/i,
        EXISTS_OPERATOR : /^(EXISTS)$/i,
        NOT_OPERATOR : /^(NOT)$/i,
        EQUALS_OPERATOR : /^==$/,
        LEFT_PARANTHESIS : /^\($/,
        RIGHT_PARANTHESIS : /^\)$/,    
    },
    /**
     * Lookup for lexemes used in the application logic
     */
    LEXEME_TYPES : {
        IDENTIFIER : 'identifier',
        LITERALS : 'literals',
        OPERATORS : 'operators',
        PARANTHESIS : 'paranthesis',
        INVALID : 'invalid'
    }
};

module.exports = constants;