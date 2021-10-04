import mailer from "#src/utils/mailer/index.js";

export async function sendEmailVerification(to, username, verificationLink) {
  const message = {
    to: to,
    subject: "Verification Account",
    template: "admin/email/email-verification",
    context: {
      name: username,
      verificationLink: verificationLink,
    },
  };

  mailer.send(message);
}

export async function sendEmailRequestPassword(to, username, resetPasswordUrl) {
  const message = {
    to: to,
    subject: "Request Password",
    template: "admin/email/request-password",
    context: {
      name: username,
      resetPasswordUrl: resetPasswordUrl,
    },
  };

  mailer.send(message);
}
