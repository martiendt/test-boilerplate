import devLogger from "./dev-logger.js";
import prodLogger from "./prod-logger.js";
import testLogger from "./test-logger.js";

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

init(process.env.NODE_ENV);

export default logger;
