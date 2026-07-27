const { stat } = require("node:fs");
const statuscode = require("../utils/statuscode");

module.exports = (requiredPermission) => {
  return (req, res, next) => {
    const userPermissions = req.user.role.permissions.map(
      (permission) => permission.name,
    );

    if (!userPermissions.includes(requiredPermission)) {
      return res.status(statuscode.FORBIDDEN).render("error/403", {
        user: req.user,
      });
    }

    next();
  };
};
