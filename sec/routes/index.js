// const express = require("express");
// const authRouter=require("./auth.router")
// const productRouter=require("./product.router")

// const Router = express.Router();

// Router.use("/api",authRouter)
// Router.use("/api",productRouter)

// module.exports = Router;

const express = require("express");

const Router = express.Router();

const pageRouter = require("./page.router");
const authRouter = require("./auth.router");
const productRouter = require("./product.router");

// EJS Pages
Router.use("/", pageRouter);

// API Routes
Router.use("/api", authRouter);
Router.use("/api", productRouter);

module.exports = Router;
