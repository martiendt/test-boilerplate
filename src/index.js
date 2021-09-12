import app from "./app.js";
import { port } from "./config/server.js";
import logger from "./utils/logger/index.js";

const configPort = port || 3000;

const server = app().then((app) => {
  app
    .listen(configPort, () => {
      logger.info(`Server listening at http://localhost:${configPort}`);
    })
    .on("error", (e) => {
      if (e.code === "EADDRINUSE")
        logger.error(`Failed to start server, Port ${configPort} is taken`);
      else logger.error(e);
    });
});

export default server;
