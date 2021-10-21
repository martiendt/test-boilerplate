import { update as updateAdmin } from "../service/admin.service.js";

export default async (req, res, next) => {
  try {
    const result = await updateAdmin(req.params.id, req.body);

    console.log(result);

    res.status(200).json("Update User");
  } catch (error) {
    next(error);
  }
};
