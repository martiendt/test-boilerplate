module.exports = async (req, res, next) => {
  try {
    res.status(200).json("Request Password");
  } catch (error) {
    next(error);
  }
};
