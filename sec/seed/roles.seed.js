const Role = require("../models/role");
const Permission = require("../models/permission");
const logger = require("../utils/logger");

async function seedRolesWithPermissions() {
  try {
    logger.info("Seeding Roles & Permissions...");

    await Role.deleteMany();
    await Permission.deleteMany();

    const permissions = await Permission.insertMany([
      { name: "product:create" },
      { name: "product:read" },
      { name: "product:update" },
      { name: "product:delete" },
    ]);

    const permissionMap = {};

    permissions.forEach((permission) => {
      permissionMap[permission.name] = permission._id;
    });

    await Role.create([
      {
        name: "admin",
        permissions: Object.values(permissionMap),
      },
      {
        name: "manager",
        permissions: [
          permissionMap["product:create"],
          permissionMap["product:read"],
          permissionMap["product:update"],
        ],
      },
      {
        name: "user",
        permissions: [permissionMap["product:read"]],
      },
    ]);

    logger.info("Roles & Permissions Seeded Successfully");
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
}

module.exports = seedRolesWithPermissions;
