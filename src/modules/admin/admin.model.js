import { ObjectId } from "mongodb";
import Connection from "#src/database/connection.js";
import queryString from "#src/utils/query-string-mongodb/index.js";

const collectionName = "admins";

export const restrictedFields = ["password", "emailVerificationCode"];

export async function createCollection(database) {
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

export async function dropCollection(database) {
  try {
    await database.collection(collectionName).drop();
  } catch (error) {
    throw new Error(error);
  }
}

export async function create() {}

/**
 * Fetch all data from database
 *
 * @param {Object} query
 * @param {Object} options
 * @return {Object}
 * @public
 */
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
      .filter(queryString.filter(query.filter))
      .skip(queryString.skip((page - 1) * limit))
      .limit(queryString.limit(limit))
      .sort(queryString.sort(query.sort))
      .project(
        queryString.fields(
          query.fields,
          options.includeRestrictedFields === false ? restrictedFields : []
        )
      );

    const result = await cursor.toArray();

    const totalDocument = await collection.countDocuments(
      queryString.filter(query.filter)
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
 * Fetch one data from database
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
        queryString.fields(
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

export async function update() {}

export async function remove() {}

export async function updatePassword() {}

export async function resetPassword() {}

export async function createDefaultAdmin() {}
