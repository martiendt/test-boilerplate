import nodemailer from "nodemailer";
import mailer from "../index.js";
import { setupEnvironment } from "#src/config/environment.js";

describe("mailer", () => {
  it("should use dev environment", async (done) => {
    jest.setTimeout(1000 * 60 * 10);
    const callback = (error, info) => {
      console.log("1");
      if (error) {
        console.log("3");
        console.log("Error occurred. " + error.message);
        done(error);
      }
      console.log("2");
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      done();
    };

    const message = {
      to: "test@mail.com",
      subject: "Verification Account",
      template: "admin/email/email-verification",
      context: {
        name: "username",
        verificationLink: "verificationLink",
      },
    };

    mailer.send(message, callback);
  });
  it("should use production environment", async () => {
    process.env.NODE_ENV = "production";
    const message = {
      to: "test@mail.com",
      subject: "Verification Account",
      template: "admin/email/email-verification",
      context: {
        name: "username",
        verificationLink: "verificationLink",
      },
    };
    await mailer.send(message);
  });
});
