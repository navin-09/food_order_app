import winston from "winston";
const { combine, timestamp, colorize, printf } = winston.format;

// Custom printf format that includes the timestamp
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize({ all: true }), // Add color to console output
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss", // Customize the timestamp format as needed
    }),
    myFormat // Use the custom format that includes the timestamp
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logfile.log" }),
  ],
});

export default logger;
