import crypto from "crypto";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { collectionName, restrictedFields } from "../admin.schema.js";
import { authAdminConfig } from "#src/config/auth.js";
import Connection from "#src/database/connection.js";
import queryString from "#src/utils/query-string-mongodb/index.js";

export async function updatePassword(
  id,
  newPassword,
  options = { upsert: true }
) {
  try {
    const collection = Connection.getDatabase().collection(collectionName);

    const filter = { _id: ObjectId(id) };

    const hashPassword = await bcrypt.hash(newPassword, 10);

    let data = {
      password: hashPassword,
    };

    const result = await collection.updateOne(filter, { $set: data }, options);

    return result;
  } catch (err) {
    return new Error(err);
  }
}

export async function requestPassword() {}

export async function resetPassword() {}
