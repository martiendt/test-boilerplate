import logger from "./logger/index.js";

export default function handleResponse(res, result) {
  logger.info(JSON.stringify(result));
  res.json({ result });
}
