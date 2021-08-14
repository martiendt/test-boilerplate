import winston from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, json } = winston.format;

const dailyRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const logger = winston.createLogger({
  exitOnError: false,
  level: "error",
  format: combine(
    winston.format.colorize(),
    winston.format.errors({ stack: true }),
    timestamp(),
    json()
  ),
  defaultMeta: { service: "boilerplate-service" },
  transports: [dailyRotateTransport],
});

export default logger;
