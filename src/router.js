import fs from "fs";
import path from "path";
import express from "express";
import {
  passportAdminLocal,
  passportAdminJwt,
} from "#src/middleware/auth/passport.js";

const app = express();

/**
 * Import Passport for authentication
 */
passportAdminLocal();
passportAdminJwt();

/**
 * Get Client IP
 * 1. Edit nginx header like this "proxy_set_header X-Forwarded-For $remote_addr;"
 * 2. Enable trust proxy on express app "app.set('trust proxy', true)"
 * 3. Use "req.ip" to get Client IP
 */
app.set("trust proxy", true);

/**
 * All available module routes
 */

async function getModuleRouter(dir, key = "", deep = 0) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const dirPath = path.join(dir, dirent.name);
      if (dirent.isDirectory() && deep == 0) {
        return getModuleRouter(dirPath, dirent.name, deep + 1);
      } else if (dirent.name === "router.js") {
        return { [key]: dirPath };
      }
    })
  );
  return files.flat();
}

getModuleRouter("./src/modules")
  .then(async (res) => {
    res = res.filter((n) => n);
    const object = Object.assign({}, ...res);
    for (const property in object) {
      const { default: router } = await import(
        `./modules/${property}/router.js`
      );
      app.use(`/${property}`, router);
    }
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
