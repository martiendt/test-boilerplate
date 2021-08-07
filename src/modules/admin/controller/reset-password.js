module.exports = async (req, res, next) => {
  try {
    res.status(200).json("Reset Password");
  } catch (error) {
    next(error);
  }
};
