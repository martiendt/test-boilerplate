export default async (req, res, next) => {
  try {
    res.status(200).json("Signout");
  } catch (error) {
    next(error);
  }
};
