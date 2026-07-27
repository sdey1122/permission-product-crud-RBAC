require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../utils/logger");
const seedRolesWithPermissions = require("../seed/roles.seed");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL;

    if (!uri) {
      logger.error("No MONGO_URL found in .env");
      return;
    }

    await mongoose.connect(uri);

    // seedRolesWithPermissions();

    logger.info("MongoDB connected");
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
