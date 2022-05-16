const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

//middleware
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require('cors');

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
 * Cors (use the back in api)
 */
 const corsOptions = {
  origin: process.env.CLIENT_URL, //Allows only our front for request
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions))

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
app.use("/api/post", postRoutes)

/**
 * server
 */
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
