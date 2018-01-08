/*jshint multistr:true, node:true, esversion:6*/
"use strict";

const G = require('./globals'),
      utility = G.Utility,
      Evaluator = require('./evaluator'),
      constants = require('./constants');

/**
 * This is main class for the Application initializatiom
 */
class App{
    constructor(inputFilePath, outputFilePath){
        this.inputFilePath = inputFilePath;
        this.outputFilePath = outputFilePath;
    }

    /**
     * This method initialises the flow for the application
     */
    init(){
        let self = this;
        // It validates whether the input file path and output filepath entered in command line is valid or not
        if(utility.validateFilePath(self.inputFilePath) && utility.validateFilePath(self.outputFilePath)){
            utility.logMessage('Input and Output FilePaths are validated, Reading records from csv');

            // If paths are valid, input data is read from the filepath mentioned by user
            utility.readCsvFile(self.inputFilePath)
            .then(function(inputData){
                utility.logMessage('CSV reading completed');

                let outputData = [];

                //ForEch input data, we are initantiating Evaluator with expression and jsonData
                inputData.forEach(function(data){
                    let evaluator = new Evaluator(data.expression, data.jsonData);
                    let evaluationResult = evaluator.evaluate();

                    outputData.push({expression : data.expression, jsonData: data.jsonData, result : evaluationResult});
                });

                utility.logMessage('Evaluation of each expression is completed');

                //All the output records are written in a file path mentioned by user (or default as output.csv)
                return utility.writeCsvFile(outputData, self.outputFilePath);
            })
            .then(function(){
                //Signifies the completion of application running suite
                utility.logMessage('Program suite completed. Please check the file : '+ self.outputFilePath + ' for results.');
                process.exit(0);
            })
            .catch(function(err){
                utility.logMessage(err.message, constants.LOG_LEVELS.ERROR);
                process.exit(-1);
            });

        }else{
            utility.logMessage('Invalid/Missing input or output file path', constants.LOG_LEVELS.ERROR);
            process.exit(-1);
        }
    }
}

/**
 * This is the Invoking Function for the application
 */
(function(){
    //Taking input and output filePaths from the console
    const inputFilePath = process.argv[2];
    const outputFilePath = process.argv[3] || "output.csv";

    utility.modifyLogLevel(constants.LOG_LEVELS.VERBOSE, true);
    
    utility.logMessage('Intiating App with inputs from file:' + inputFilePath);
    //Initiating an instance of application
    let app = new App(inputFilePath, outputFilePath);
    app.init();
})();