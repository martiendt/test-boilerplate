import { constants } from "http2";
import { create as createAdmin } from "../admin.model.js";
import mailer from "#src/utils/mailer/index.js";

export default async (req, res, next) => {
  try {
    const result = await createAdmin(req.body);

    console.log(result);

    // const verificationEmailUrl = `${process.env.DOMAIN_API}/v1/auth/verify-email?emailToken=${result.ops[0].emailVerificationCode}`

    // const message = {
    //   to: "test@example.com",
    //   subject: "Point Checkin Verification Account",
    //   html: `Thanks for signin up, <p>please click link below to verify your email address to get access to our apps.</p>`,
    // };

    // mailer.send(message);

    return res.status(constants.HTTP_STATUS_CREATED).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
