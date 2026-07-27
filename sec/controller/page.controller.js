const Product = require("../models/Product");

class PageController {
  // Home Page
  async home(req, res) {
    res.render("index");
  }

  // Login Page
  async login(req, res) {
    res.render("auth/login");
  }

  // Signup Page
  async signup(req, res) {
    res.render("auth/signup");
  }

  // Dashboard
  async dashboard(req, res) {
    const totalProducts = await Product.countDocuments();

    const activeProducts = await Product.countDocuments({
      status: "active",
    });

    const inactiveProducts = await Product.countDocuments({
      status: "inactive",
    });

    res.render("dashboard/dashboard", {
      totalProducts,
      activeProducts,
      inactiveProducts,
      user: req.user || null,
    });
  }

  // Product List
  async products(req, res) {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.render("product/index", {
      products,
    });
  }

  // Create Product Page
  async createProduct(req, res) {
    res.render("product/create");
  }

  // Edit Product Page
  async editProduct(req, res) {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.render("error/404");
    }

    res.render("product/edit", {
      product,
    });
  }

  // 401
  unauthorized(req, res) {
    res.status(401).render("error/401");
  }

  // 403
  forbidden(req, res) {
    res.status(403).render("error/403");
  }

  // 404
  notFound(req, res) {
    res.status(404).render("error/404");
  }
}

module.exports = new PageController();
