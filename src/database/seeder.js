import { searchFiles } from "#src/utils/file-system/index.js";

export async function seed() {
  try {
    const object = await searchFiles("seed.js", "./src/modules");
    for (const property in object) {
      const { seed } = await import(`#${object[property]}`.replace('\\','/'));
      await seed();
    }
  } catch (error) {
    throw error;
  }
}
