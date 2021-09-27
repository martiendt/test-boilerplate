import { constants } from "http2";
import { create as createAdmin } from "../service/admin.service.js";

export default async (req, res, next) => {
  try {
    const result = await createAdmin(req.body);

    console.log(result);

    return res.status(constants.HTTP_STATUS_CREATED).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
