import * as adminModel from "../admin.model.js";
import { generateEmailVerificationCode, generateEncryptedPassword } from "../utils/generator.js";

export async function create(data) {
  try {
    // replace password with encrypted password
    data.password = await generateEncryptedPassword(data.password);
    // inject email verification code
    data.emailVerficicationCode = generateEmailVerificationCode();

    const result = await adminModel.create(data);

    return result;
  } catch (err) {
    return err;
  }
}

/**
 * Read all data from database
 *
 * @param {Object} query
 * @param {Object} options
 * @returns {Promise<Object>}
 * @public
 */
export async function readAll(query, options = { includeRestrictedFields: false }) {
  try {
    // set default value
    query.page = Number(query.page ?? 1);
    query.limit = Number(query.limit ?? 10);

    const result = await adminModel.readAll(query, options);

    return {
      data: result.data,
      page: result.page,
      totalPerPage: result.totalPerPage,
      totalDocument: result.totalDocument,
    };
  } catch (err) {
    return new Error(err);
  }
}

/**
 * Read one data from database
 *
 * @param {String} id
 * @param {Object} query
 * @param {Object} options
 * @returns {Promise<Object>}
 * @public
 */
export async function readOne(
  id,
  query = {},
  options = {
    includeRestrictedFields: false,
  }
) {
  try {
    const result = await adminModel.readOne(id, query, options);

    return result ?? {};
  } catch (err) {
    return new Error(err);
  }
}

export async function update(id, data = {}, options = { upsert: true }) {
  try {
    const result = await adminModel.update(id, data, options);

    return result;
  } catch (err) {
    return new Error(err);
  }
}

export async function destroy(id) {
  try {
    const result = await adminModel.destroy(id);

    return result;
  } catch (err) {
    return new Error(err);
  }
}
