import { constants } from "http2";
import { destroy } from "#src/utils/storage/index.js";

export default async (req, res, next) => {
  try {
    const data = await destroy("", "38d9ff4e-ecfd-47fa-80b9-0cd28e668761.png");

    return res.json(data);
  } catch (error) {
    next(error);
  }
};
