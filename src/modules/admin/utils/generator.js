import crypto from "crypto";

/**
 * Generate email verification
 *
 * @returns {String}
 * @public
 */
export function generateEmailVerificationCode() {
  return crypto.randomBytes(20).toString("hex");
}
