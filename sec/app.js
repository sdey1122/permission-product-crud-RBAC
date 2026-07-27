// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// //define route
// const indexRouter = require("./routes/index");
// app.use("/v1", indexRouter);

// module.exports = app;

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const globalMiddleware = require("./middleware/global.middleware");

const app = express();

// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(globalMiddleware);

// Static Files
app.use(express.static(path.join(__dirname, "../public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// 404 Page
app.use((req, res) => {
  res.status(404).render("error/404");
});

module.exports = app;
