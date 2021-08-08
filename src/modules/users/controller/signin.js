export default async (req, res, next) => {
  try {
    res.status(200).json("Signin");
  } catch (error) {
    next(error);
  }
};
