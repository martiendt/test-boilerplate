import { fetchAll } from "../admin.model.js";
import { paginate } from "../../../utils/response-format.js";
import { constants } from "http2";

export default async (req, res, next) => {
  try {
    const result = await fetchAll(req.query);

    if (result.totalDocument === 0) {
      return res.status(constants.HTTP_STATUS_NO_CONTENT).json();
    }

    res
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
