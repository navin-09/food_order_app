import winston from "winston";
const { combine, timestamp, colorize, printf } = winston.format;

// Custom printf format that includes the timestamp
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    myFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logfile.log" }),
  ],
});

export default logger;
