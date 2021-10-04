import { constants } from "http2";
import { create, readOne } from "../service/admin.service.js";
import { sendEmailVerification } from "../service/email.service.js";
import { domain } from "#src/config/server.js";

export default async (req, res, next) => {
  try {
    const result = await create(req.body);

    const user = await readOne(result.insertedId, {
      includeRestrictedFields: true,
    });

    // check spam

    // send email verification
    await sendEmailVerification(
      req.body.email,
      `${req.body.firstName} ${req.body.lastName}`,
      `https://${domain}/${user.emailVerificationCode}`
    );

    return res.status(constants.HTTP_STATUS_CREATED).json({
      insertedId: result.insertedId,
    });
  } catch (err) {
    next(err);
  }
};
