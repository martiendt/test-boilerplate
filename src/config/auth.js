import "./environment.js";

export const authAdminConfig = {
  secret: process.env.AUTH_ADMIN_SECRET || "secret",
  collectionName: process.env.AUTH_ADMIN_COLLECTION || "admins",
};

export const authUserConfig = {
  secret: process.env.AUTH_USER_SECRET || "secret",
  collectionName: process.env.AUTH_USER_COLLECTION || "users",
};
