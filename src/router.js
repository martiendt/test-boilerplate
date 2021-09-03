import express from "express";
import adminRoutes from "./modules/admin/router.js";
import userRoutes from "./modules/user/router.js";
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
 * All available module routes
 */
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

export default app;
