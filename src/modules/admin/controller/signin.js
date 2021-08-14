import { signNewToken } from "../admin.model.js";

export default async (req, res, next) => {
  try {
    console.log("signin");
    req.user.token = signNewToken(req.user._id);
    res.status(200).json({
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};
