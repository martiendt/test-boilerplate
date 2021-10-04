import { searchModules } from "../index.js";

describe("router helper", () => {
  it("should return router in modules", async () => {
    const obj = await searchModules("./src/modules");
    expect(obj).toHaveProperty("admin");
    expect(obj).toHaveProperty("user");
  });
});
