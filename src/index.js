import app from "./app.js";
import logger from "./utils/logger/index.js";

const port = 3000;

const server = app
  .listen(port, () => {
    logger.info(`Server listening at http://localhost:${port}`);
  })
  .on("error", (e) => {
    if (e.code === "EADDRINUSE")
      logger.error(`Failed to start server, Port ${port} is taken`);
    else logger.error(e);
  });

export default server;
