const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  res.locals.user = null;

  try {
    const token = req.cookies.token;

    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decoded.id).populate("role");

      res.locals.user = user;
    }
  } catch (err) {
    res.locals.user = null;
  }

  next();
};
