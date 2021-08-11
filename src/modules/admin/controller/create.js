import Connection from "../../../database/connection.js";
import handleResponse from "../../../utils/response-handler.js";
import ApiError from "../../../utils/api-error.js";
import Validator from "validatorjs";

function validateRequest(data) {
  const rules = {
    firstName: "required|string",
    lastName: "required|string",
    username: "required|alpha_num",
    email: "required|email",
    password: "required|min:8",
  };

  const validation = new Validator(data, rules);

  if (validation.fails()) {
    throw ApiError.unprocessableEntity(
      "Unprocessable Entity",
      validation.errors
    );
  }
}

export default async (req, res, next) => {
  try {
    validateRequest(req.body);

    const collection = Connection.getDatabase().collection("admins");

    const result = await collection.insertOne({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    handleResponse(res, result);
  } catch (err) {
    next(err);
  }
};
