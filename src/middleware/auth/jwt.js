import jwt from "jsonwebtoken";

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
  return jwt.sign(
    {
      iss: "",
      aud: "",
      sub: id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
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
  return jwt.sign(
    {
      iss: "express-api-boilerplate",
      sub: id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 30),
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
