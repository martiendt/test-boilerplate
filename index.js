import app from "./src/app.js";
const port = 3000;

const server = app
  .listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  })
  .on("error", (e) => {
    console.log(`Failed to start server, Port ${port} is taken`);
  });

export default server;
