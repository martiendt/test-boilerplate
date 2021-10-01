import crypto from "crypto";
import argon2 from "argon2";

/**
 * Generate email verification
 *
 * @returns {String}
 * @public
 */
export function generateEmailVerificationCode() {
  return crypto.randomBytes(20).toString("hex");
}

/**
 * Generate encrypted password
 *
 * @param {String} password
 * @returns {Promise<String>}
 * @public
 */
export async function generateEncryptedPassword(password) {
  return await argon2.hash(password);
}

/**
 * Compare encrypted password is match
 *
 * @param {String} encryptedPassword
 * @param {String} password
 * @returns {Boolean}
 * @public
 */
export async function verifyPassword(encryptedPassword, password) {
  return argon2.verify(encryptedPassword, password);
}
