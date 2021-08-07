module.exports = async (req, res, next) => {
  try {
    res.status(200).json('Signup')
  } catch (error) {
    next(error)
  }
}