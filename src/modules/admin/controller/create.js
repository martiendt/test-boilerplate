import Connection from "../../../database/connection.js";

export default async (req, res, next) => {
  try {
    await Connection.open();

    const collection = Connection.getDatabase().collection("admins");

    const result = await collection.insertOne({
      email: "dokkaebi@gmail.com",
      username: "daedalius",
      password: "daedalius",
    });

    res.json({ result });
  } catch (err) {
    next(err);
  }
};
