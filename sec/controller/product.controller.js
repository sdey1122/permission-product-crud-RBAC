const Product = require("../models/Product");
const logger = require("../utils/logger");
const statuscode = require("../utils/statuscode");

class ProductController {
  // ===========================
  // Create Product
  // ===========================
  async createProduct(req, res) {
    try {
      await Product.create(req.body);

      logger.info("Product created successfully");

      return res.redirect("/products");
    } catch (err) {
      logger.error(err.message);

      return res.status(statuscode.BAD_REQUEST).json({
        status: false,
        message: err.message,
      });
    }
  }

  // ===========================
  // Get All Products (API)
  // ===========================
  async getProducts(req, res) {
    try {
      const products = await Product.find();

      return res.status(statuscode.OK).json({
        status: true,
        message: "Products fetched successfully",
        data: products,
      });
    } catch (err) {
      logger.error(err.message);

      return res.status(statuscode.BAD_REQUEST).json({
        status: false,
        message: err.message,
      });
    }
  }

  // ===========================
  // Update Product
  // ===========================
  async updateProduct(req, res) {
    try {
      const { id } = req.params;

      await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      logger.info("Product updated successfully");

      return res.redirect("/products");
    } catch (err) {
      logger.error(err.message);

      return res.status(statuscode.BAD_REQUEST).json({
        status: false,
        message: err.message,
      });
    }
  }

  // ===========================
  // Delete Product
  // ===========================
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      await Product.findByIdAndDelete(id);

      logger.info("Product deleted successfully");

      return res.redirect("/products");
    } catch (err) {
      logger.error(err.message);

      return res.status(statuscode.BAD_REQUEST).json({
        status: false,
        message: err.message,
      });
    }
  }
}

module.exports = new ProductController();
