import express, { json, urlencoded } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv-safe";
import router from "./router.js";

dotenv.config();

const app = express();

// gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app
app.use(compression());

// parse json request body
app.use(json());

// parse urlencoded request body
app.use(urlencoded({ extended: false }));

// set security HTTP headers
app.use(helmet());

// cors
app.use(cors());

// v1 api routes
app.use("/v1", router);

export default app;
