const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

/**
 * Check if user logged in
 */
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};
