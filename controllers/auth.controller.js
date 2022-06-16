const UserModel = require("../models/user.model");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const jwt = require("jsonwebtoken");

// Token validity time  (3 days)
const maxAge = 3 * 24 * 60 * 60 * 1000;

/**
 * Create token for login
 */
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge,
    })
} 

/**
 * Sign UP
 * @param {*} req 
 * @param {*} res 
 */
module.exports.signUp = async (req, res) => {
    const { pseudo, email, password} = req.body;

    try{
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id});
    }
    catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors })
    }
}


/**
 * LOG IN
 * @param {*} req 
 * @param {*} res 
 */
module.exports.signIn = async (req, res) => {
    const {email, password } = req.body;

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge });
        res.status(200).json({ userId: user._id, token: token, pseudo: user.pseudo});
    }catch(err) {
        const errors = signInErrors(err);
        res.status(200).send({ errors });
    }
}


/**
 * Logout
 */
 module.exports.logout = (req, res) => {
    res.cookie("jwt", '', {path:'/', maxAge: 1});
    res.end(); 
    /*res.redirect('/');*/
}