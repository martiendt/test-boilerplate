import { setupEnvironment } from "./environment.js";

setupEnvironment(process.env.NODE_ENV);

export const mailConfig = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,
};
