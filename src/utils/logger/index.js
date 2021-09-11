import devLogger from "./dev-logger.js";
import prodLogger from "./prod-logger.js";
import testLogger from "./test-logger.js";
import { env } from "#src/config/server.js";

let logger = null;

export function init(env) {
  if (env === "production") {
    logger = prodLogger;
    logger.info("Logger started");
  } else if (env === "test") {
    logger = testLogger;
    logger.info("Logger started");
  } else {
    logger = devLogger;
    logger.info("Logger started");
  }
}

init(env);

export default logger;
