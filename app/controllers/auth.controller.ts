import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { signUpErrors, signInErrors } from "../utils/errors.utils";
import * as jwt from 'jsonwebtoken';

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
 * Sign Up
 */
 export const signUp = async (req: Request, res: Response) => {
    const { pseudo, email, password } = req.body as any;

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
 export const signIn = async (req: Request, res: Response) => {
    const {email, password } = req.body;

    try {
        const user = await (UserModel as any).login(email, password);
        const token = createToken(user._id);

        res.cookie("jwt", token, { httpOnly: true, maxAge });
        res.status(200).json({ userId: user._id, token: token });
    }catch(err) {
        const errors = signInErrors(err);
        res.status(200).send({ errors });
    }
}


/**
 * Logout
 */
 export const logout = (req: Request, res: Response) =>  {
    res.cookie("jwt", '', {path:'/', maxAge: 1});
    res.end(); 
    /*res.redirect('/');*/
}

/**
 * AUTHENTIFICATE
 * @param req 
 * @param res 
 */
 export const AuthentificateUser = async (req: Request, res: Response) => {
    const { password, ...user } = req['user']
    res.send(user); //Because we have the AuthMiddleware before in the Route
}