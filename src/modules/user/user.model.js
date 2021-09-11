const collectionName = "users";
const bsonType = "object";
const required = ["username", "email", "password"];
const properties = {
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
};

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
            bsonType,
            required,
            properties,
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
