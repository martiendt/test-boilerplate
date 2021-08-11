import ApiError from "./api-error.js";
import logger from "./logger/index.js";

export default function (error, req, res, next) {
  if (error instanceof ApiError) {
    console.log(error);
    return res.status(error.code).json({ error });
  }

  // Log unknown error
  logger.error(error);

  return res.status(500).json({ error: { message: "Internal Server Error" } });
}
