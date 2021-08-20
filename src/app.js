import express, { json, urlencoded } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import router from "./router.js";
import errorHandler from "./utils/error-handler.js";
import ApiError from "./utils/api-error.js";
import Connection from "./database/connection.js";
import mongodbErrorHandler from "./utils/mongodb-error-handler.js";
import "#src/config/environment.js";

const app = express();

// Open connection to mongodb database
if (process.env.NODE_ENV === "test") Connection.open();

// Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app
app.use(compression());

// Parse json request body
app.use(json());

// Parse urlencoded request body
app.use(urlencoded({ extended: false }));

// Set security HTTP headers
app.use(helmet());

// Cors
app.use(cors());

// Api routes version 1
app.use("/v1", router);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(ApiError.notFound());
});

// Error handler
app.use(mongodbErrorHandler);
app.use(errorHandler);

export default app;
