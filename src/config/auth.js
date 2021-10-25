import { setupEnvironment } from "./environment.js";

setupEnvironment(process.env.NODE_ENV);

export const authConfig = {
  secret: process.env.AUTH_SECRET || "secret",
  collectionName: process.env.AUTH_COLLECTION || "admins",
};
