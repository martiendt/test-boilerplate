import { clean as cleanObject } from "../index.js";

describe("object-helper", () => {
  it("should remove empty value on object", async () => {
    const date = new Date();
    const obj = {
      a: "a",
      b: "",
      c: undefined,
      d: null,
      e: {
        e1: "",
        e2: "e2",
        e3: null,
        e4: undefined,
      },
      f: date,
    };

    const result = cleanObject(obj);

    expect(result).toStrictEqual({
      a: "a",
      e: {
        e2: "e2",
      },
      f: date,
    });
  });
});
