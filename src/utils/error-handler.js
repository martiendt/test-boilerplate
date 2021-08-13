import ApiError from "./api-error.js";
import logger from "./logger/index.js";
import { constants } from "http2";

export default function (error, req, res, next) {
  if (error instanceof ApiError) {
    return res.status(error.code).json({ error });
  }

  // Log unknown error
  logger.error(error);

  return res
    .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .json({ error: { message: "Internal Server Error" } });
}
