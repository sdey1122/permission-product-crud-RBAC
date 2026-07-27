const express = require("express");
const router = express.Router();

const pageController = require("../controller/page.controller");

const auth = require("../middleware/auth.middleware");
const permit = require("../middleware/permission.middleware");

// Home
router.get("/", pageController.home);

// Authentication
router.get("/login", pageController.login);
router.get("/signup", pageController.signup);

// Dashboard
router.get("/dashboard", auth, pageController.dashboard);

// Product Pages
router.get("/products", auth, permit("product:read"), pageController.products);

router.get(
  "/products/create",
  auth,
  permit("product:create"),
  pageController.createProduct,
);

router.get(
  "/products/edit/:id",
  auth,
  permit("product:update"),
  pageController.editProduct,
);

// Error Pages
router.get("/401", pageController.unauthorized);
router.get("/403", pageController.forbidden);
router.get("/404", pageController.notFound);

module.exports = router;
