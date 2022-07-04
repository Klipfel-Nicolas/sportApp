import  express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/user.routes";
import { postRoutes } from "./routes/post.routes";

//middleware
/* const { checkUser, requireAuth } = require("./middleware/auth.middleware"); */
const cors = require('cors');

/**
 * .ENV
 * DATABASE
 */
require("dotenv").config({ path: "app/config/.env" });
require("./config/db.js");


/**
 * Express
 */
const app = express();

/**
 * Cors (use the back in api)
 */
 const corsOptions = {
  origin: "http://localhost:8080", //Allows only our front for request
  credentials: true,
  'Access-Control-Allow-Headers': 'Authorization',
  /*'allowedHeaders': ['sessionId', 'Content-Type'],*/
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
 * Routes
 */

userRoutes(app);
postRoutes(app);
/**
 * server
 */
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
