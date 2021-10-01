import argon2 from "argon2";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { authAdminConfig } from "#src/config/auth.js";

/**
 * Encrypt password
 *
 * @param {String} password
 * @returns {Promise<String>}
 * @public
 */
export const encryptPassword = async (password) => {
  return await argon2.hash(password);
};

/**
 * Compare encrypted password is match
 *
 * @param {String} encryptedPassword
 * @param {String} password
 * @returns {Boolean}
 * @public
 */
export const verifyPassword = async (encryptedPassword, password) => {
  return argon2.verify(encryptedPassword, password);
};

/**
 * Sign new jwt token for authentication
 *
 * @param {String} id
 * @returns {String}
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
