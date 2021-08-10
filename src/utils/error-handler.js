import { MongoServerError } from "mongodb";
import ApiError from "./api-error.js";

export default function (error, req, res, next) {
  if (error.status === 401) {
    return res.status(401).json({ error });
  }
  if (error instanceof ApiError) {
    return res.status(error.code).json({ error });
  }
  return res.status(500).json({ error: { message: "Internal Server Error" } });
}
