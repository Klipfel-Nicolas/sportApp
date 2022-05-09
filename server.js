const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");

//middleware
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

/**
 * .ENV
 * DATABASE
 */
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

/**
 * Express
 */
const app = express();

/**
 * Parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * User logged
 */
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
})

/**
 * Routes
 */
app.use("/api/user", userRoutes)

/**
 * server
 */
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
