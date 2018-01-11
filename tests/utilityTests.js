/*jshint multistr:true, node:true, esversion:6, mocha:true*/
'use strict';

const should = require('should'),
    constants = require('../constants');

const utilityTest = function(){

    describe('Utility class methods Test Suite', function(){

        let utilityInstance = new (require('../utility'))();

        describe('getLogLevelsAllowed() method test cases', function(){
            it('should return two levels on instance creation', function(){
                let logLevelsAllowed = utilityInstance.getLogLevelsAllowed();
                logLevelsAllowed.should.match(function(it){
                    return it.should.be.an.Array();
                });
                logLevelsAllowed.should.have.length(2);
            });

        });
    
        describe('modifyLogLevel() method test cases', function(){

            it('should return 1 log level after removing logLevel ERROR from allowed log levels', function(){
                utilityInstance.modifyLogLevel(constants.LOG_LEVELS.ERROR, false);

                let logLevelsAllowed = utilityInstance.getLogLevelsAllowed();
                logLevelsAllowed.should.match(function(it){
                    return it.should.be.an.Array();
                });
                logLevelsAllowed.should.have.length(1);
            });

            it('should return 3 log level after adding logLevel ERROR, VERBOSE to allowed log levels', function(){
                utilityInstance.modifyLogLevel(constants.LOG_LEVELS.ERROR, true);
                utilityInstance.modifyLogLevel(constants.LOG_LEVELS.VERBOSE, true);

                let logLevelsAllowed = utilityInstance.getLogLevelsAllowed();
                logLevelsAllowed.should.match(function(it){
                    return it.should.be.an.Array();
                });
                logLevelsAllowed.should.have.length(3);
            });

        });

        describe('isJsonString() method test cases', function(){

            it('should return true if valid json string is passed', function(){
                utilityInstance.isJsonString('{"x": 2}').should.be.true();
            });

            it('should return false if invalid json string is passed', function(){
                utilityInstance.isJsonString('{"x": 2,"y"}').should.be.false();
            });

            it('should return false if undefined is passed', function(){
                utilityInstance.isJsonString(undefined).should.be.false();
            });
        });

        describe('getTypeCastValue() method test cases', function(){
            
            it('should return boolean if boolean string has been passed', function(){
                let value = utilityInstance.getTypeCastValue('TRUE');
                value.should.match(function(it){
                    return it.should.be.an.Boolean();
                });
                value.should.be.equal(true);
            });

            it('should return decimal number if decimal string has been passed', function(){
                let value = utilityInstance.getTypeCastValue('10.90');
                value.should.match(function(it){
                    return it.should.be.a.Number();
                });
                value.should.not.be.NaN();
                value.should.be.equal(10.90);
            });

            it('should return number if integer string has been passed', function(){
                let value = utilityInstance.getTypeCastValue('10');
                value.should.match(function(it){
                    return it.should.be.a.Number();
                });
                value.should.not.be.NaN();
                value.should.be.equal(10);
            });

            it('should return string with quotes if integer string has been passed', function(){
                let value = utilityInstance.getTypeCastValue('akash');
                value.should.match(function(it){
                    return it.should.be.a.String();
                });
                value.should.be.equal("'akash'");
            });

            it('should null string if undefined/null string has been passed', function(){
                let value = utilityInstance.getTypeCastValue();
                value.should.match(function(it){
                    return it.should.be.a.String();
                });
                value.should.be.equal("null");
            });

        });

    });
};

module.exports = utilityTest;