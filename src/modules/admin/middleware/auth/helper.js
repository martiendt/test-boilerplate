import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { authAdminConfig } from "#src/config/auth.js";

/**
 * Encrypt password
 *
 * @param {String} password
 * @return {String}
 * @public
 */
export const encryptPassword = (password) => {
  return hashSync(password, 10);
};

/**
 * Compare encrypted password is match
 *
 * @param {String} password
 * @param {String} encryptedPassword
 * @return {Boolean}
 * @public
 */
export const verifyPassword = (password, encryptedPassword) => {
  return compareSync(password, encryptedPassword);
};

/**
 * Sign new jwt token for authentication
 *
 * @param {String} id
 * @return {String}
 */
export const signNewToken = (id) => {
  return jwt.sign(
    {
      iss: "express-api-boilerplate",
      sub: id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 30),
    },
    authAdminConfig.secret
  );
};
