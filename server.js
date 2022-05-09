const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
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
 * bodyParser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



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
