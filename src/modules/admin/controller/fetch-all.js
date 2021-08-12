import { fetchAll } from "../admins.model.js";

export default async (req, res, next) => {
  try {
    const result = await fetchAll(req);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
