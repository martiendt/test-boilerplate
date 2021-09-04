import { compare } from "bcrypt";
import JWT from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { authAdminConfig } from "#src/config/auth.js";
import Connection from "#src/database/connection.js";
import qsp from "#src/utils/query-string-parse/index.js";

const collectionName = "admins";

export const restrictedFields = ["password", "emailVerificationCode"];

/**
 * Create & Drop Collection Schema
 * ===============================
 */

export async function create(database) {
  try {
    const collections = await database.listCollections().toArray();
    const exists = collections.some(function (el) {
      return el.name === collectionName;
    });
    if (!exists) {
      await database.createCollection(collectionName, {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["username", "email", "password"],
            properties: {
              createdAt: {
                bsonType: "date",
                description: "must be a date and is required",
              },
              username: {
                bsonType: "string",
                minLength: 3,
                maxLength: 30,
                description: "must be a string and is required",
              },
              email: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              emailVerificationCode: {
                bsonType: "string",
                description: "must be a string",
              },
              emailVerified: {
                type: "boolean",
                description: "must be a boolean",
              },
              password: {
                bsonType: "string",
                minLength: 8,
                maxLength: 255,
                description: "must be a string and is required",
              },
              firstName: {
                bsonType: "string",
                description: "must be a string",
              },
              lastName: {
                bsonType: "string",
                description: "must be a string",
              },
              address: {
                bsonType: "string",
                description: "must be a string",
              },
              phone: {
                bsonType: "string",
                description: "must be a string",
              },
              phoneVerificationCode: {
                bsonType: "string",
                description: "must be a string",
              },
              phoneVerified: {
                type: "boolean",
                description: "must be a boolean",
              },
              status: {
                bsonType: "string",
                enum: ["active", "suspended"],
                description: "must be a string between active or suspended",
              },
            },
          },
        },
      });
    }
    await database.collection(collectionName).createIndex(
      { username: -1 },
      {
        unique: true,
        collation: {
          locale: "en",
          strength: 2,
        },
      }
    );
    await database.collection(collectionName).createIndex(
      { email: -1 },
      {
        unique: true,
        collation: {
          locale: "en",
          strength: 2,
        },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function drop(database) {
  try {
    await database.collection(collectionName).drop();
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchAll(
  query,
  options = { includeRestrictedFields: false }
) {
  try {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const collection = Connection.getDatabase().collection("admins");

    const cursor = collection
      .find({
        _id: query._id,
      })
      .filter(qsp.filter(query.filter))
      .skip(qsp.skip((page - 1) * limit))
      .limit(qsp.limit(limit))
      .sort(qsp.sort(query.sort))
      .project(
        qsp.fields(
          query.fields,
          options.includeRestrictedFields === false ? restrictedFields : []
        )
      );

    const result = await cursor.toArray();

    const totalDocument = await collection.countDocuments(
      qsp.filter(query.filter)
    );

    return {
      data: result,
      page: page,
      totalPerPage: limit,
      totalDocument: totalDocument,
    };
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Fetch one data
 *
 * @param {String} id
 * @param {Object} query
 * @param {Object} options
 * @return {Object}
 * @public
 */
export async function fetchOne(
  id,
  query = {},
  options = {
    includeRestrictedFields: false,
  }
) {
  try {
    const collection = Connection.getDatabase().collection("admins");

    const cursor = collection
      .find({
        _id: ObjectId(id),
      })
      .project(
        qsp.fields(
          query.fields,
          options.includeRestrictedFields === false ? restrictedFields : []
        )
      );

    const result = await cursor.toArray();

    return result.length > 0 ? result[0] : {};
  } catch (err) {
    throw new Error(err);
  }
}
