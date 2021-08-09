import Connection from "../../../database/connection.js";

export default async (req, res, next) => {
  try {
    await Connection.open();
    console.log(Connection.getDatabase());
    const collection = Connection.getDatabase().collection("files");

    const files = collection.insertOne({
      a: "b",
      c: "d",
    });

    res.json({ files: files });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
