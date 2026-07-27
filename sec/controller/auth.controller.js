const User = require("../models/user");
const Role = require("../models/role");
const statuscode = require("../utils/statuscode");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

class AuthController {
  // Register User
  async signup(req, res) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
        return res.status(statuscode.BAD_REQUEST).json({
          status: false,
          message: "All fields are required",
        });
      }

      const user = await User.findOne({ email });

      if (user) {
        return res.status(statuscode.BAD_REQUEST).json({
          status: false,
          message: "User already exists",
        });
      }

      const userRole = await Role.findOne({
        name: role || "user",
      });

      if (!userRole) {
        logger.error("Role not found");

        return res.status(statuscode.BAD_REQUEST).json({
          status: false,
          message: "Role not found",
        });
      }

      await User.create({
        name,
        email,
        password,
        role: userRole._id,
      });

      logger.info(`New user registered: ${email}`);

      return res.redirect("/login");
    } catch (err) {
      logger.error(err.message);

      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: err.message,
      });
    }
  }

  // Login User
  async signin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(statuscode.BAD_REQUEST).json({
          status: false,
          message: "Email and Password are required",
        });
      }

      const user = await User.findOne({ email }).populate("role");

      if (!user) {
        return res.status(statuscode.BAD_REQUEST).json({
          status: false,
          message: "User not found",
        });
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.status(statuscode.BAD_REQUEST).json({
          status: false,
          message: "Invalid Credentials",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        },
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      logger.info(`${user.email} logged in successfully`);

      return res.redirect("/dashboard");
    } catch (err) {
      logger.error(err.message);

      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: "Server Error",
      });
    }
  }

  // Logout User
  logout(req, res) {
    res.clearCookie("token");

    return res.redirect("/login");
  }
}

module.exports = new AuthController();
