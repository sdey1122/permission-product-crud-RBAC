const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const permit = require("../middleware/permission.middleware");

const productController = require("../controller/product.controller");

router.post(
  "/store",
  auth,
  permit("product:create"),
  productController.createProduct,
);

router.get(
  "/getall",
  auth,
  permit("product:read"),
  productController.getProducts,
);

router.post(
  "/update/:id",
  auth,
  permit("product:update"),
  productController.updateProduct,
);

router.post(
  "/delete/:id",
  auth,
  permit("product:delete"),
  productController.deleteProduct,
);

module.exports = router;
