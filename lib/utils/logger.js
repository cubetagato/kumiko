'use strict';

const config = require('../configuration');
const winston = require('winston');

const tsFormat = () => (new Date()).toLocaleTimeString();

console.log("Creating logger...");
try {

  var logger = new(winston.Logger)({
    transports: [
      new (winston.transports.File)({
        level: config.get('logger:file:level'),
        filename: config.get('logger:file:file_name'),
        handleExceptions: config.get('logger:file:handle_exceptions'),
        json: config.get('logger:file:json'),
        maxsize: config.get('logger:file:maxsize'),
        maxFiles: config.get('logger:file:maxfiles'),
        colorize: config.get('logger:file:colorize'),
        //TODO: Add better format
        timestamp: tsFormat
      })/*,
      new (winston.transports.Console)({
        level: config.get('logger:console:level'),
        handleExceptions: config.get('logger:console:handle_exceptions'),
        json: config.get('logger:console:json'),
        colorize: config.get('logger:console:colorize'),
        timestamp: tsFormat
      })*/
    ]
  });

  /*TODO: ¿por qué no agrega la consola?
  console.log(process.env.NODE_ENV);
  if(process.env.NODE_ENV.toString() == "development") {
    console.log('entra');
    logger.add(
      new (winston.transports.Console)({
        level: config.get('logger:console:level'),
        handleExceptions: config.get('logger:console:handle_exceptions'),
        json: config.get('logger:console:json'),
        colorize: config.get('logger:console:colorize')
      })
    );
  }*/

  logger.info("logger created");

} catch (e) {
  console.log("Error creating logger: ", e);
  return;
}

module.exports = logger;
