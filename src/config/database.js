import dotenv from "dotenv-safe";

dotenv.config({
  allowEmptyValues: true,
});

const database = {
  host: process.env.DB_HOST || "mongodb://127.0.0.1:27017",
  cluster: process.env.DB_CLUSTER,
  name: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export default database;
