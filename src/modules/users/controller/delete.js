module.exports = async (req, res, next) => {
  try {
    res.status(200).json("Delete UserWorld");
  } catch (error) {
    next(error);
  }
};
