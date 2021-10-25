import jwt from "jsonwebtoken";
import { serverConfig } from "#src/config/server.js";

export const tokenType = "Bearer";

/**
 * Get Token From Header
 *
 * @param {Object} req
 * @returns {String}
 */
export const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === tokenType) {
    return req.headers.authorization.split(" ")[1];
  }
};

/**
 * Sign new jwt token for authentication
 *
 * @param {String} id
 * @param {String} secret
 * @returns {String}
 */
export const signNewToken = (id, secret) => {
  const date = new Date().getTime();
  // expired in 1 hour
  const exp = new Date().setTime(date + 1000 * 60 * 60);
  return jwt.sign(
    {
      iss: serverConfig.appName,
      sub: id,
      iat: date,
      exp: exp,
    },
    secret
  );
};

/**
 * Generate refresh token
 *
 * @param {String} id
 * @param {String} secret
 * @returns {String}
 */
export const generateRefreshToken = (id, secret) => {
  const date = new Date().getTime();
  // expired in 1 month
  const exp = new Date().setTime(date + 1000 * 60 * 60 * 24 * 30);
  return jwt.sign(
    {
      iss: serverConfig.appName,
      sub: id,
      iat: date,
      exp: exp,
    },
    secret
  );
};

/**
 * Verify jwt token
 *
 * @param {String} token
 * @param {String} secret
 * @returns {Object}
 */
export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

/**
 * Check expiration token
 *
 * @param {Timestamp} exp
 * @returns {Boolean}
 */
export const isExpired = (exp) => {
  if (new Date().getTime() < exp) {
    return false;
  }

  return true;
};
