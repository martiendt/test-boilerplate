export default async (req, res, next) => {
  try {
    res.status(200).json("Update User");
  } catch (error) {
    next(error);
  }
};
