import { constants } from "http2";
import { readAll } from "../service/admin.service.js";
import { sendEmailVerification } from "../service/email.service.js";
import { paginate } from "#src/utils/response-format/index.js";

export default async (req, res, next) => {
  try {
    const result = await readAll(req.query);

    await sendEmailVerification(
      "johndoe@example.com",
      "John Does",
      "https://www.google.com"
    );

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
