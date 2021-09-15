import express from "express";
import { searchModules } from "./utils/router-helper/index.js";
import {
  passportAdminLocal,
  passportAdminJwt,
} from "#src/middleware/auth/passport.js";

const app = express();

/**
 * Import Passport for authentication
 */
passportAdminLocal();
passportAdminJwt();

/**
 * Get Client IP
 * 1. Edit nginx header like this "proxy_set_header X-Forwarded-For $remote_addr;"
 * 2. Enable trust proxy on express app "app.set('trust proxy', true)"
 * 3. Use "req.ip" to get Client IP
 */
app.set("trust proxy", true);

/**
 * Register all available modules
 */
searchModules("./src/modules")
  .then(async (obj) => {
    for (const property in obj) {
      const { default: router } = await import(
        `./modules/${property}/router.js`
      );
      app.use(`/${property}`, router);
    }
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
