import express from "express";
import {
  passportAdminLocal,
  passportAdminJwt,
} from "#src/middleware/auth/passport.js";
import adminRouter from "#src/modules/admin/router.js";
import userRouter from "#src/modules/user/router.js";

const app = express();

/**
 * Import Passport for protecting routes
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
app.use(`/admin`, adminRouter);
app.use(`/user`, userRouter);

export default app;
