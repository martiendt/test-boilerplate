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

export async function sendEmailRequestPassword(to, username, resetPasswordLink) {
  const message = {
    to: to,
    subject: "Verification Account",
    template: "admin/email/request-password",
    context: {
      name: username,
      resetPasswordLink: resetPasswordLink,
    },
  };

  mailer.send(message);
}
