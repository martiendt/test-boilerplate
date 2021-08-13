import { signNewToken } from "../admins.model.js";

export default async (req, res, next) => {
  try {
    req.user.token = signNewToken(req.user._id);
    res.status(200).json({
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};
