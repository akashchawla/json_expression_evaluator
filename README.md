The idea behind design of the application is taken from the concept of lexical analysis.

- Each expression is broken down into lexemes.
- Each lexeme is then classified into a particlar token class.
- The comibnation of <lexeme, tokenClass> i.e. Token is then sent to a parser
- Parser evaluates all the tokens and finds the result of each expression

=== HOW TO SETUP THE APPLICATION ===

1. Clone the repository onto your local machine.
2. Install the Node (supported above version 6.*.* ) if not already present.
3. Once Node is installed, open the terminal and move to the directory in which you have cloned to code.
4. Verify the node version by running command : node -v or node --version
5. Then Run the command npm install , this command will install all the dependencies required for the project
6. Your application is now setup, to verify run command node app.js

NOTE: 
- app.js is the starting point of the application
- Application reads from the CSV file , a sample input file is at root directory of repository


=== HOW TO RUN THE APPLICATION ===

To run the application , you need to run following command 

```
node app.js <<input_file_path>> <<output_file_path>>
```

<<input_file_path>> - It is mandatory command line arguement required by the application. This is the path from which application picks the input data.
<<output_file_path>> - It is non-mandatory arguement. By default, it saves result at root directory of repository

