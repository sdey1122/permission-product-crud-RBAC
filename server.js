require("dotenv").config();

const logger = require("./sec/utils/logger");
const connectDB = require("./sec/config/db");
const app = require("./sec/app");

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
})();
