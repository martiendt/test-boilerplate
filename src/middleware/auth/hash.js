import argon2 from "argon2";

/**
 * Encrypt
 *
 * @param {String} data
 * @returns {Promise<String>}
 * @public
 */
export const encrypt = async (data) => {
  try {
    return await argon2.hash(data);
  } catch (error) {
    throw error;
  }
};

/**
 * Compare encrypted data
 *
 * @param {String} encryptedData
 * @param {String} plainData
 * @returns {Promise<Boolean>}
 * @public
 */
export const verify = async (encryptedData, plainData) => {
  try {
    return await argon2.verify(encryptedData, plainData);
  } catch (error) {
    throw error;
  }
};
