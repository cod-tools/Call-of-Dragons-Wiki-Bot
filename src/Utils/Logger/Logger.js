const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors } = format;

const colorize = (log, level) => {
  let ansiColor = "";

  switch (level) {
    case "error":
      ansiColor = "\x1b[31m"; // red
      break;
    case "warn":
      ansiColor = "\x1b[33m"; // yellow
      break;
    case "info":
      ansiColor = "\x1b[32m"; // green
      break;
    case "debug":
      ansiColor = "\x1b[36m"; // blue
      break;
    default:
      ansiColor = "\x1b[0m"; // white
      break;
  }

  return `${ansiColor}${log}`
};


const logFormat = printf(({ level, message, timestamp, stack }) => {
  let formattedLog;

  if (stack) {
    formattedLog = `[${timestamp}]: 🢃\n${stack}\x1b[0m`;
  } else {
    formattedLog = `[${timestamp}]: ${message}\x1b[0m`;
  }

  return colorize(formattedLog, level)
});

const logger = createLogger({
  format: combine(
    timestamp({ format: "MM-DD-YYYY hh:mm A" }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [new transports.Console({
    level: 'debug'
  })],
});

module.exports = logger;


// const { createLogger, format, transports, addColors } = require("winston");
// const { combine, timestamp, printf, colorize, errors } = format;

// const logFormat = printf(({ level, message, timestamp, stack }) => {
//   let formattedLog;

//   if (stack) {
//     formattedLog = `[${timestamp}]: 🢃\n${stack}`;
//   } else {
//     formattedLog = `[${timestamp}]: ${message}`;
//   }

//   return formattedLog
// });

// const logger = createLogger({
//   format: combine(
//     colorize({ all: true }),
//     timestamp({ format: "MM-DD-YYYY hh:mm A" }),
//     errors({ stack: true }),
//     logFormat
//   ),
//   transports: [new transports.Console({
//     level: 'debug'
//   })],
// });

// addColors({
//   error: "red",
//   warn: "yellow",
//   info: "green",
//   debug: "cyan",
// });

// module.exports = logger;