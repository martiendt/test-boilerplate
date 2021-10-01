import fs from "fs";
import path from "path";

/**
 * Search router inside modules
 *
 * @param {String} dir
 * @param {String} key
 * @param {Integer} deep
 * @returns {Promise<Object>}
 */
export async function searchModules(dir, key = "", deep = 0) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const dirPath = path.join(dir, dirent.name);
      if (dirent.isDirectory() && deep == 0) {
        return searchModules(dirPath, dirent.name, deep + 1);
      } else if (dirent.name === "router.js") {
        return { [key]: dirPath };
      }
    })
  );

  let result = files.flat();
  result = result.filter((n) => n);
  return Object.assign({}, ...result);
}
