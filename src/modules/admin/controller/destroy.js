import { constants } from "http2";
import { destroy } from "../service/admin.service.js";
import ApiError from "#src/middleware/error-handler/api-error.js";

export default async (req, res, next) => {
  try {
    const result = await destroy(req.params.id);

    if (result.deletedCount === 0) {
      return next(ApiError.unprocessableEntity(undefined, { errors: { id: ["id not found"] } }));
    }

    return res.status(constants.HTTP_STATUS_NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
};
