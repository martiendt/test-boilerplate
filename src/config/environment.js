/**
 * .env (not shared) is used in production mode.
 * .env.development(shared) and .env.development.local (not shared) are used in development mode.
 * .env.test(shared) and .env.test.local (not shared) are used in test mode.
 */
import dotenv from "dotenv-safe";
import * as fs from 'fs';

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  allowEmptyValues: true,
  path: process.env.NODE_ENV === "production" ? ".env"
  : fs.existsSync(`.env.${process.env.NODE_ENV}.local`) 
  ? `.env.${process.env.NODE_ENV}.local` : `.env.${process.env.NODE_ENV}`
});

export default dotenv