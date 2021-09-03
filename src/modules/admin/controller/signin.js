export default async (req, res, next) => {
  try {
    res.status(200).json({
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};
