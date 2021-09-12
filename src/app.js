import compression from "compression";
import cors from "cors";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import Connection from "./database/connection.js";
import ApiError from "./middleware/error-handler/api-error.js";
import errorHandler from "./middleware/error-handler/index.js";
import router from "./router.js";
import { env } from "#src/config/server.js";

export default async function () {
  const app = express();

  if (env !== "test") {
    // Open connection to mongodb database
    await Connection.open();

    // Add collections and schema validation
    await Connection.createCollections();
  }

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
  app.use(errorHandler);

  return app;
}
