import * as fs from "fs";
import dotenv from "dotenv";

/**
 * Setup environment
 *
 * @param {String} env
 * @public
 */
export function setupEnvironment(env) {
  dotenv.config({
    allowEmptyValues: true,
    path: getPath(env),
  });
}

/**
 * Get path of environment file
 * .env (not shared) is used in production mode.
 * .env.development(shared) and .env.development.local (not shared) are used in development mode.
 * .env.test(shared) and .env.test.local (not shared) are used in test mode.
 *
 * @param {String} env
 * @returns {String}
 * @private
 */
function getPath(env) {
  let path = ".env";

  if (env !== "production") {
    if (fs.existsSync(`.env.${env}.local`)) {
      path = `.env.${env}.local`;
    } else {
      path = `.env.${env}`;
    }
  }

  return path;
}

export default dotenv;
