import { constants } from "http2";
import { readOne } from "../service/admin.service.js";
import ApiError from "#src/middleware/error-handler/api-error.js";

export default async (req, res, next) => {
  try {
    const result = await readOne(req.params.id, req.query);

    if (Object.keys(result).length === 0) {
      return next(ApiError.unprocessableEntity(undefined, { errors: { id: ["id not found"] } }));
    }

    res.status(constants.HTTP_STATUS_OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
