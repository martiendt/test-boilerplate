export const collectionName = "admins";

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
            required: ["username", "email", "password", "createdAt", "updatedAt"],
            properties: {
              createdAt: {
                bsonType: "date",
                description: "must be a date and is required",
              },
              updatedAt: {
                bsonType: "date",
                description: "must be a date and is required",
              },
              lastOnline: {
                bsonType: "date",
                description: "must be a date",
              },
              lastIp: {
                bsonType: "string",
                description: "must be a string",
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
              tokens: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["accessToken", "refreshToken", "expiresAt", "issuer", "audience"],
                  properties: {
                    createdAt: {
                      bsonType: "date",
                      description: "must be a date and is required",
                    },
                    accessToken: {
                      bsonType: "string",
                      description: "must be a string and is required",
                    },
                    accessTokenExpiresAt: {
                      bsonType: "date",
                      description: "must be a date and is required",
                    },
                    refreshToken: {
                      bsonType: "string",
                      description: "must be a string and is required",
                    },
                    refreshTokenExpiresAt: {
                      bsonType: "date",
                      description: "must be a date and is required",
                    },
                    issuer: {
                      bsonType: "string",
                      description: "must be a string and is required",
                    },
                    audience: {
                      bsonType: "string",
                      description: "must be a string and is required",
                    },
                  },
                },
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
    throw error;
  }
}

export async function dropCollection(database) {
  try {
    await database.collection(collectionName).drop();
  } catch (error) {
    throw error;
  }
}
