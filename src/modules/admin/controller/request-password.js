import mailer from "#src/utils/mailer/index.js";

export default async (req, res, next) => {
  try {
    // const verificationEmailUrl = `${process.env.DOMAIN_API}/v1/auth/verify-email?emailToken=${result.ops[0].emailVerificationCode}`

    // const message = {
    //   to: "test@example.com",
    //   subject: "Point Checkin Verification Account",
    //   html: `Thanks for signin up, <p>please click link below to verify your email address to get access to our apps.</p>`,
    // };

    // mailer.send(message);

    res.status(200).json("Request Password");
  } catch (error) {
    next(error);
  }
};
