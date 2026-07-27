const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/login");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });

    if (!user) {
      return res.redirect("/login");
    }

    req.user = user;

    next();
  } catch (err) {
    return res.redirect("/login");
  }
};
