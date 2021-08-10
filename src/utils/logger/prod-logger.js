import winston from "winston";

const { combine, timestamp, printf, json } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(
    winston.format.colorize(),
    winston.format.errors({ stack: true }),
    timestamp(),
    json()
  ),
  defaultMeta: { service: "boilerplate-service" },
  transports: [new winston.transports.Console()],
});

export default logger;
