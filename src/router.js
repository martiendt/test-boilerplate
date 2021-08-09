import express from "express";
import adminRoutes from "./modules/admin/router.js";
import userRoutes from "./modules/user/router.js";

const app = express();

app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

export default app;
