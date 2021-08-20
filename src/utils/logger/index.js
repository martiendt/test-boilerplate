import devLogger from "./dev-logger.js";
import prodLogger from "./prod-logger.js";

let logger = null;

if (process.env.NODE_ENV !== "production") {
  logger = devLogger;
} else if (process.env.NODE_ENV !== "testing") {
  logger = prodLogger;
} else {
  logger = prodLogger;
}

export default logger;
