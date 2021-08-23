import devLogger from "./dev-logger.js";
import prodLogger from "./prod-logger.js";
import testLogger from "./test-logger.js";

let logger = null;

if (process.env.NODE_ENV === "production") {
  logger = prodLogger;
} else if (process.env.NODE_ENV === "test") {
  logger = testLogger;
} else {
  logger = devLogger;
}

export default logger;
