require("dotenv").config();

const connectDB = require("../config/db");
const seedRolesWithPermissions = require("./roles.seed");

(async () => {
  try {
    await connectDB();

    await seedRolesWithPermissions();

    console.log("Seeding completed successfully.");

    process.exit(0);
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
})();
