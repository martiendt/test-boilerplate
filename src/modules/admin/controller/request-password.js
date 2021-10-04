import { constants } from "http2";
import { readAll } from "../service/admin.service.js";
import { sendEmailRequestPassword } from "../service/email.service.js";

export default async (req, res, next) => {
  try {
    // check email is valid
    // check user email in database
    // check spam
    const result = await readAll(req.body);
    const user = result[0];
    const token = "";
    const resetPasswordUrl = `${process.env.DOMAIN_API}/v1/auth/reset-password?resetToken=${token}`;

    await sendEmailRequestPassword(user.email, user.username, resetPasswordUrl);

    res.status(constants.HTTP_STATUS_OK).json();
  } catch (error) {
    next(error);
  }
};
