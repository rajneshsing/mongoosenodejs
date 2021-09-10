/*const winston = require('winston');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
 
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
	new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;*/

const {transports, createLogger, format} = require('winston');

// Enable exception handling when you create your logger.
const logger = createLogger({
	format: format.combine(
            format.timestamp(),
            format.json()
        ),
  transports: [
    //new transports.File({ filename: 'combined.log' },{'timestamp':true}) 
	new transports.File({filename: 'error.log', level: 'error','timestamp':true}),
    new transports.File({filename: 'info.log', level:'info','timestamp':true})
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' })
  ]
});
module.exports = logger;