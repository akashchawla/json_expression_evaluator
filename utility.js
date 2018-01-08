/*jshint multistr:true, node:true, esversion:6*/
"use strict";

const util = require('util'),
      fs = require('fs'),
      csv = require('fast-csv'),
      _ = require('lodash'),
      constants = require('./constants');
/**
 * This Class specifies all the utility methods used in the application
 */
class Utility{

    /**
     * Constructr of the Utility class
     */
    constructor(){
        this.logLevelAllowed = new Array(constants.LOG_LEVELS.INFO, constants.LOG_LEVELS.ERROR);
    }

    /**
     * This method overides the level of log at run time to enable special logs
     * @param {String} level : The level you want to set in run_time
     * @param {Boolean} addLevel : Whether you wanna add or remove above level from list of allowed levels
     */
    modifyLogLevel(level, addLevel){
        if(_.values(constants.LOG_LEVELS).indexOf(level) > -1){
            if(addLevel){
                this.logLevelAllowed = this.logLevelAllowed.concat[level];
            }else{
                this.logLevelAllowed = _.filter(function(allowedLevel){
                    return allowedLevel !== level;
                });
            }
        }
    }

    /**
     * This method returns the list of levels allowed for logging in the application
     */
    getLogLevelsAllowed(){
        return this.logLevelAllowed;
    }

    /**
     * This method checks the log level in the list of allowed levels currently being set
     * @param {String} message - Message that you want to print
     * @param {String} logLevel - Leve against which it is checked
     */
    logMessage(message, logLevel){
        let self = this;
        if(!logLevel || (_.values(constants.LOG_LEVELS).indexOf(logLevel) > -1 && self.logLevelAllowed && self.logLevelAllowed.indexOf(logLevel) > -1)){
            logLevel = logLevel || constants.LOG_LEVELS.INFO;
            console.log(util.format('[%s]', logLevel.toUpperCase()), message);
        }
    }

    /**
     * This utility validates the file path entered by user.
     * @param {String} filePath 
     */
    validateFilePath(filePath){
        return filePath && constants.REGEX.FILE_PATH.test(filePath);
    }

    /**
     * This utility reads records from csv and returns the data in form of array of objects
     * @param {String} filePath : File-Path from which records needs to be parsed
     */
    readCsvFile(filePath){
        let self = this;
        return new Promise(function(resolve, reject){
            let inputData = [];
            try{
                csv
                .fromPath(filePath, {headers: true})
                .on("data", function(rowData){
                    inputData.push(rowData);
                })
                .on("end", function(){
                    resolve(inputData);
                });
            }
            catch(ex){
                let err = new Error();
                err.message = 'An error occurred while fetching records from csv: ' + ex.toString();
                reject(err);
            }
        });
    }

    /**
     * This utility writes the records into a csv file
     * @param {Array} records : Records meta which will be written in the csv-file
     * @param {String} filePath : File-Path at which records needs to be written
     */
    writeCsvFile(records, filePath){
        let self = this;
        return new Promise(function(resolve, reject){
            try{
                csv
                .writeToPath(filePath, records, {headers: true})
                .on("finish", function(){
                    resolve();
                });  

            }catch(ex){
                let err = new Error();
                err.message = 'An error occurred while writing records to a csv file at path: ' + filePath;
                reject(err);
            }
        });
    }

    /**
     * This utility checks whether a particular string is a json or not
     * @param {String} str : The input json String which needs to be validated 
     */
    isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    /**
     * This utility checks the string value against the particular regexs
     * and returns the value accordingly
     * @param {String} value 
     */
    getTypeCastValue(value){
        if(!value){
            return 'null';
        }
        else if(constants.REGEX.BOOLEAN_VALUE.test(value)){
            return value.toLoweCase() === 'true';
        }
        else if(constants.REGEX.DECIMAL_VALUE.test(value)){
            return !isNaN(Number(value)) ? Number(value) : 0.00;
        }
        else if(constants.REGEX.INTEGER_VALUE.test(value)){
            return !isNaN(Number(value)) ? Number(value) : 0;
        }else{
            return util.format("'%s'",value);
        }
    }

}

module.exports = Utility;