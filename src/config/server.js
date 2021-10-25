import { setupEnvironment } from "./environment.js";

setupEnvironment(process.env.NODE_ENV);

export const serverConfig = {
  appName: process.env.APP_NAME,
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  domain: process.env.DOMAIN,
};
