export const collectionName = "rate-limits";

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
            required: ["counter", "ip", "expiredAt", "createdAt"],
            properties: {
              counter: {
                bsonType: "int",
                description: "must be a int and is required",
              },
              ip: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              label: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              createdAt: {
                bsonType: "date",
                description: "must be a date and is required",
              },
              expiredAt: {
                bsonType: "date",
                description: "must be a date and is required",
              },
            },
          },
        },
      });
    }
    await database.collection(collectionName).createIndex(
      { ip: 1, label: 1 },
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
