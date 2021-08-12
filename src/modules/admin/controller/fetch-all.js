import { fetchAll } from "../admins.model.js";
import { paginate } from "../../../utils/response-format.js";
export default async (req, res, next) => {
  try {
    const result = await fetchAll(req);

    res
      .status(200)
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
