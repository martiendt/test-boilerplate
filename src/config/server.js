import { setupEnvironment } from "./environment.js";

setupEnvironment(process.env.NODE_ENV);

export const appName = process.env.APP_NAME;

export const env = process.env.NODE_ENV;

export const port = process.env.PORT || 3000;

export const domain = process.env.DOMAIN;
