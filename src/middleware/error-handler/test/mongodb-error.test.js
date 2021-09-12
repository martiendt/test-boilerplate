import { handle as handleMongoDbError } from "../mongodb-error.js";
describe("error handler", () => {
  describe("mongodb error", () => {
    it("should return error format for unique", () => {
      // Sample error from mongodb
      let error = {
        code: 11000,
        keyPattern: { username: -1 },
      };
      error = handleMongoDbError(error);
      expect(error.code).toStrictEqual(422);
      expect(error.errors["username"]).toStrictEqual(["is exists"]);
    });

    it("should return error format for invalid schema", () => {
      // Sample error from mongodb
      let error = {
        index: 0,
        code: 121,
        errInfo: {
          failingDocumentId: "613dc19a16662f4b5bdb98dc",
          details: {
            operatorName: "$jsonSchema",
            schemaRulesNotSatisfied: [
              {
                operatorName: "properties",
                propertiesNotSatisfied: [
                  {
                    propertyName: "firstName",
                    details: [
                      {
                        operatorName: "bsonType",
                        specifiedAs: {
                          bsonType: "string",
                        },
                        reason: "type did not match",
                        consideredValue: null,
                        consideredType: "null",
                      },
                    ],
                  },
                  {
                    propertyName: "lastName",
                    details: [
                      {
                        operatorName: "bsonType",
                        specifiedAs: {
                          bsonType: "string",
                        },
                        reason: "type did not match",
                        consideredValue: null,
                        consideredType: "null",
                      },
                    ],
                  },
                ],
              },
              {
                operatorName: "required",
                specifiedAs: {
                  required: ["username", "email", "password"],
                },
                missingProperties: ["password"],
              },
            ],
          },
        },
      };

      error = handleMongoDbError(error);
      expect(error.code).toStrictEqual(422);
      expect(error.errors).toHaveProperty("firstName");
      expect(error.errors).toHaveProperty("lastName");
      expect(error.errors).toHaveProperty("password");
    });
  });
});
