/**
 * .env (not shared) is used in production mode.
 * .env.development(shared) and .env.development.local (not shared) are used in development mode.
 * .env.test(shared) and .env.test.local (not shared) are used in test mode.
 */
import * as fs from "fs";
import dotenv from "dotenv-safe";

export function setupEnvironment(env) {
  dotenv.config({
    allowEmptyValues: true,
    path:
      env === "production"
        ? ".env"
        : fs.existsSync(`.env.${env}.local`)
        ? `.env.${env}.local`
        : `.env.${env}`,
  });
}

setupEnvironment(process.env.NODE_ENV);

export default dotenv;
