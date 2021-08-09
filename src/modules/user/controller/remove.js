export default async (req, res, next) => {
  try {
    res.status(200).json("Delete User");
  } catch (error) {
    next(error);
  }
};
