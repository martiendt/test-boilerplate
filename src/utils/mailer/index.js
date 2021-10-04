import fs from "fs";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import inLineCss from "nodemailer-juice";
import { mailConfig } from "#src/config/mail.js";
import { copyrightYear, appName } from "#src/resources/emails/handlebarsHelpers.js";

// create reusable transporter object using the default SMTP transport
const devTransporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: {
    user: mailConfig.username,
    pass: mailConfig.password,
  },
});

devTransporter.use(
  "compile",
  hbs({
    viewEngine: {
      // defaultLayout: false,
      layoutsDir: "./src/resources/emails",
      partialsDir: "./src/resources/emails",
      helpers: { copyrightYear, appName },
      extname: ".hbs",
    },
    viewPath: "./src/modules",
    extName: ".hbs",
  })
);
devTransporter.use(
  "compile",
  inLineCss({
    extraCss: fs.readFileSync("./src/resources/emails/styles.min.css").toString(),
  })
);

export default {
  async send(data) {
    data.from = `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`;
    if (process.env.NODE_ENV === "production") {
      //
    } else {
      // send mail with defined transport object
      devTransporter.sendMail(data, (error, info) => {
        if (error) {
          console.log("Error occurred. " + error.message);
          throw error;
        }

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        console.log("Message sent: %s", info.messageId);

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
    }
  },
};
