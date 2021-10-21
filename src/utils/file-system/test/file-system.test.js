import { searchFiles } from "../index.js";

describe("file system", () => {
  it("should return files inside directory", async () => {
    const obj = await searchFiles("router.js", "./src/modules");
    expect(obj).toHaveProperty("admin");
  });
});
