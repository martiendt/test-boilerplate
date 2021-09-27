import mailer from "#src/utils/mailer/index.js";

export async function sendEmailVerification(data) {
  // const verificationEmailUrl = `${process.env.DOMAIN_API}/v1/auth/verify-email?emailToken=${result.ops[0].emailVerificationCode}`;

  const message = {
    to: "test@example.com",
    subject: "Verification Account",
    template: "admin/email/email-verification",
    context: {
      name: "John Doe",
    },
  };

  mailer.send(message);
}
