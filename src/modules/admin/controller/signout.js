import { constants } from "http2";
import { updatePassword } from "../service/auth.service.js";

export default async (req, res, next) => {
  try {
    const result = await updatePassword(req.params.id, req.body.password);

    console.log(result);

    res.status(constants.HTTP_STATUS_OK).json();
  } catch (error) {
    next(error);
  }
};
