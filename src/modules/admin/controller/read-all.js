import { constants } from "http2";
import { readAll } from "../admin.model.js";
import { paginate } from "#src/utils/response-format/index.js";

export default async (req, res, next) => {
  try {
    const result = await readAll(req.query);

    return res
      .status(constants.HTTP_STATUS_OK)
      .json(
        paginate(
          result.data,
          result.page,
          result.totalPerPage,
          result.totalDocument
        )
      );
  } catch (error) {
    next(error);
  }
};
