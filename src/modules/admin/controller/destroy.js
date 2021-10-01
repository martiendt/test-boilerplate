import { destroy } from "../service/admin.service.js";
import ApiError from "#src/middleware/error-handler/api-error.js";

export default async (req, res, next) => {
  try {
    const result = await destroy(req.params.id);

    if (result.deletedCount === 0) {
      return next(ApiError.badRequest());
    }

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
