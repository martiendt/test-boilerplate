const express = require("express");

const app = express();
const adminRoutes = require("./modules/admin/router");
const userRoutes = require("./modules/users/router");

app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

module.exports = app;
