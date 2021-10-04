import express from "express";
import { searchModules } from "./utils/file-system/index.js";

export default async function () {
  try {
    const app = express();

    /**
     * Get Client IP
     * 1. Edit nginx header like this "proxy_set_header X-Forwarded-For $remote_addr;"
     * 2. Enable trust proxy on express app "app.set('trust proxy', true)"
     * 3. Use "req.ip" to get Client IP
     */
    app.set("trust proxy", true);

    /**
     * Register all available modules
     */
    const object = await searchModules("./src/modules");
    for (const property in object) {
      const { default: router } = await import(`./modules/${property}/router.js`);
      app.use(`/${property}`, router);
    }
    return app;
  } catch (error) {
    throw error;
  }
}
