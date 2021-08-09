export default async (req, res, next) => {
  try {
    res.status(200).json("Fetch One User");
  } catch (error) {
    next(error);
  }
};
