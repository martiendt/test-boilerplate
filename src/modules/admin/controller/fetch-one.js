import { constants } from "http2";
import { fetchOne } from "../admin.model.js";

export default async (req, res, next) => {
  try {
    const result = await fetchOne(req.params.id, req.query);

    if (Object.keys(result).length === 0) {
      return res.status(constants.HTTP_STATUS_NO_CONTENT).json();
    }

    res.status(constants.HTTP_STATUS_OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
