import { setupEnvironment } from "./environment.js";

setupEnvironment(process.env.NODE_ENV);

export const env = process.env.NODE_ENV;

export const port = process.env.PORT || 3000;
