import ItemFactory from "./item.factory.js";

describe("d", () => {
  it("i", () => {
    const itemFactory = new ItemFactory();
    itemFactory.state({
      name: "b",
    });
    const result = itemFactory.make();
    expect(result.name).toBe("b");
  });

  it("i", () => {
    const itemFactory = new ItemFactory();
    itemFactory.state({
      quantity: 10,
    });
    itemFactory.sequence([
      {
        name: "a",
      },
      {
        name: "b",
      },
      {
        name: "c",
      },
    ]);
    itemFactory.count(4);
    const result = itemFactory.make();
    expect(result.length).toBe(4);
    expect(result[0].name).toBe("a");
    expect(result[1].name).toBe("b");
    expect(result[2].name).toBe("c");
    expect(result[3].name).toBe("a");
    expect(result[0].quantity).toBe(10);
    expect(result[1].quantity).toBe(10);
    expect(result[2].quantity).toBe(10);
    expect(result[3].quantity).toBe(10);
  });

  it("db", async () => {
    const itemFactory = new ItemFactory();
    itemFactory.state({
      name: "b",
    });
    const result = await itemFactory.create();
    expect(result).toBe("success");
  });
});
