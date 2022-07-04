import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model"
import { verify } from "jsonwebtoken";


export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    try{
        const jwt = req.cookies['jwt'];
        const payload: any = verify(jwt, process.env.TOKEN_SECRET);
    
        if(!payload) {
            return res.status(401).send({message: 'Unauthenticated'});
        }
        
        req["user"] = await UserModel.findById(payload.id);

        next();
    } catch (error) {
        return res.status(401).send({message: 'Unauthenticated'});
    }
}