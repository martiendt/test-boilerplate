import * as path from "path";
import { fileURLToPath } from "url";
import compression from "compression";
import cors from "cors";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import Connection from "./database/connection.js";
import ApiError from "./middleware/error-handler/api-error.js";
import errorHandler from "./middleware/error-handler/index.js";
import router from "./router.js";
import { serverConfig } from "#src/config/server.js";
import { seed } from "#src/database/seeder.js";

export default async function app() {
  const app = express();

  if (serverConfig.env !== "test") {
    // open connection to mongodb database
    await Connection.open();

    // add collections and schema validation
    await Connection.createCollections();

    // seed database
    await seed();
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
  app.use("/v1", await router());

  /**
   * API documentation
   * ===========================================================
   * This would serve api documentation website
   *
   * const __dirname = path.dirname(fileURLToPath(import.meta.url));
   * res.sendFile(path.join(__dirname, "../docs/index.html"));
   *
   * Code above isn't work on jest (SyntaxError: Cannot use 'import.meta' outside a module)
   * So we use process.cwd() instead
   */
  app.use("/assets", express.static("src/assets"));
  app.use("/assets/api-docs", express.static("docs"));
  app.get("/", (req, res) => {
    res.header("Content-Security-Policy", "script-src blob:");
    res.header("Content-Security-Policy", "worker-src blob:");
    res.sendFile(path.join(process.cwd(), "/docs/index.html"));
  });

  // Send back a 404 error for any unknown api request
  app.use((req, res, next) => {
    next(ApiError.notFound());
  });

  // Error handler
  app.use(errorHandler);

  return app;
}
