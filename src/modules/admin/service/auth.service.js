import * as adminModel from "../admin.model.js";
import { generateEncryptedPassword } from "../utils/generator.js";

export async function updatePassword(id, newPassword, options = { upsert: false }) {
  try {
    const encryptedPassword = await generateEncryptedPassword(newPassword);

    const data = { password: encryptedPassword };

    const result = await adminModel.update(id, data, options);

    return result;
  } catch (err) {
    return new Error(err);
  }
}

export async function requestPassword() {}

export async function resetPassword() {}
