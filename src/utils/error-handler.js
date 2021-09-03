import { STATUS_CODES } from "http";
import { constants } from "http2";
import ApiError from "./api-error.js";
import logger from "./logger/index.js";

export default function (error, req, res, next) {
  if (error instanceof ApiError) {
    return res.status(error.code).json({ error });
  }

  if (error.status === constants.HTTP_STATUS_UNAUTHORIZED) {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      error: { message: STATUS_CODES[constants.HTTP_STATUS_UNAUTHORIZED] },
    });
  }

  // Log unknown error
  logger.error(error);

  return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
    error: {
      message: STATUS_CODES[constants.HTTP_STATUS_INTERNAL_SERVER_ERROR],
    },
  });
}
