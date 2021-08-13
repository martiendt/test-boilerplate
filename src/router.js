import express from "express";
import adminRoutes from "./modules/admin/router.js";
import userRoutes from "./modules/user/router.js";
import "./utils/passport.js";

const app = express();

/**
 * Get Client IP
 * 1. Edit nginx header like this "proxy_set_header X-Forwarded-For $remote_addr;"
 * 2. Enable trust proxy on express app "app.set('trust proxy', true)"
 * 3. Use "req.ip" to get Client IP
 */
app.set("trust proxy", true);

app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

export default app;
