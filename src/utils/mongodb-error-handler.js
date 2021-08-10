import { MongoError } from "mongodb";
import ApiError from "./api-error.js";

export default function (error, req, res, next) {
  if (error instanceof MongoError) {
    if (error.code === 11000) {
      const message = `${Object.keys(error.keyPattern)} already exists`;
      next(ApiError.unprocessableEntity(message));
    }
  }
  next(error);
}
