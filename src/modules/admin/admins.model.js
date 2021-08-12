import Connection from "../../database/connection.js";
import qsp from "../../utils/query-string-parse.js";

const collectionName = "admins";
const restrictedFields = ["password", "emailVerificationCode"];

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

export async function fetchAll(req) {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const collection = Connection.getDatabase().collection("admins");
    console.log(qsp.filter(req.query.filter));

    const cursor = collection
      .find()
      .filter(qsp.filter(req.query.filter))
      .skip(qsp.skip((page - 1) * limit))
      .limit(qsp.limit(limit))
      .sort(qsp.sort(req.query.sort))
      .project(qsp.fields(req.query.fields, restrictedFields));

    const result = await cursor.toArray();

    const totalDocument = await collection.countDocuments(
      qsp.filter(req.query.filter)
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

export async function fetchOne() {
  try {
    // allowed fields to select
    const allowedFields = ["username", "email", "password"];
    console.log("HAL");
    const result = await Connection.getDatabase()
      .collection("admins")
      .findOne();
    console.log("NBE");
    console.log(result);

    return result;
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
}
