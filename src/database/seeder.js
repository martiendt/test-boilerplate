import { searchSeeds } from "#src/utils/file-system/index.js";

export async function seed() {
  try {
    const object = await searchSeeds("./src/modules");
    for (const property in object) {
      const { seed } = await import(`../modules/${property}/seed.js`);
      await seed();
    }
  } catch (error) {
    throw error;
  }
}
