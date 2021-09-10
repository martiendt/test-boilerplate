import qsp from "#src/utils/query-string-parse/index.js";

describe("query string parse", () => {
  describe("fields", () => {
    it("should convert format field", () => {
      const fields = "username, firstName, lastName";

      const result = qsp.fields(fields);

      expect(result).toStrictEqual({ firstName: 1, lastName: 1, username: 1 });
    });

    it("should convert format field with restricted field", () => {
      const fields = "username, firstName, lastName, password";
      const restrictedFields = "password";

      const result = qsp.fields(fields, restrictedFields);

      expect(result).toStrictEqual({ firstName: 1, lastName: 1, username: 1 });
    });

    it("should convert format field with restricted field", () => {
      const fields = "";
      const restrictedFields = ["password"];

      const result = qsp.fields(fields, restrictedFields);

      expect(result).toStrictEqual({ password: 0 });
    });
  });

  describe("filters", () => {
    it("should return empty object when query undefined", () => {
      const query = undefined;
      const result = qsp.filter(query);
      expect(result).toStrictEqual({});
    });

    it("should convert query string to object", () => {
      const query = '{"name":"John", "age":30, "city":"New York"}';
      const result = qsp.filter(query);
      expect(result).toStrictEqual({ name: "John", age: 30, city: "New York" });
    });

    it("should convert format field", () => {
      const query = {
        ":or": [
          { name: { ":like": "/john/" } },
          { age: "32" },
          { isAdmin: "true" },
          { isSuspended: "false" },
          { suspendedAt: null },
          { createdAt: "2021-01-01" },
        ],
      };

      const result = qsp.filter(query);

      expect(result).toStrictEqual({
        $or: [
          { name: { $regex: "/john/" } },
          { age: 32 },
          { isAdmin: true },
          { isSuspended: false },
          { suspendedAt: null },
          { createdAt: new Date("2021-01-01") },
        ],
      });
    });
  });

  describe("skip", () => {
    it("should return integer value", () => {
      const result = qsp.skip("10");
      expect(result).toStrictEqual(10);
    });
  });

  describe("limit", () => {
    it("should return integer value", () => {
      const result = qsp.limit("10");
      expect(result).toStrictEqual(10);
    });

    it("should return default value", () => {
      const result = qsp.limit();
      expect(result).toStrictEqual(10);
    });

    it("should return maximum value", () => {
      const result = qsp.limit(2000);
      expect(result).toStrictEqual(1000);
    });
  });

  describe("sort", () => {
    it("should return converted value", () => {
      const result = qsp.sort("username,-address");
      expect(result).toStrictEqual({
        username: 1,
        address: -1,
      });
    });
    it("should return null when no field passes", () => {
      const result = qsp.sort();
      expect(result).toBeNull();
    });
  });
});
