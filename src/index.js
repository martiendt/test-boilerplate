import app from "./app.js";
const port = 3000;

const server = app
  .listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  })
  .on("error", (e) => {
    if (e.code === "EADDRINUSE")
      console.log(`Failed to start server, Port ${port} is taken`);
    else console.log(e);
  });

export default server;
