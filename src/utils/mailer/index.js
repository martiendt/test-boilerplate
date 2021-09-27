import nodemailer from "nodemailer";
import { mailConfig } from "#src/config/mail.js";

// create reusable transporter object using the default SMTP transport
const devTransporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: {
    user: mailConfig.username,
    pass: mailConfig.password,
  },
});

export default {
  async send(data) {
    data.from = `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`;
    if (process.env.NODE_ENV === "production") {
      //
    } else {
      // send mail with defined transport object
      devTransporter.sendMail(data, (err, info) => {
        if (err) {
          console.log("Error occurred. " + err.message);
          return new Error(err);
        }

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        console.log("Message sent: %s", info.messageId);

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
    }
  },
};
