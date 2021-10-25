import app from "./app.js";
import { serverConfig } from "./config/server.js";
import logger from "./utils/logger/index.js";

const server = app().then((app) => {
  app
    .listen(serverConfig.port, () => {
      logger().info(`Server listening at http://localhost:${serverConfig.port}`);
    })
    .on("error", (e) => {
      if (e.code === "EADDRINUSE") {
        logger().error(`Failed to start server, Port ${serverConfig.port} is taken`);
      } else {
        logger().error(e);
      }
    });
});

export default server;
