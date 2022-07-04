import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import * as fs from 'fs';
import { uploadErrors } from "../utils/errors.utils";
const { promisify } = require("util");
const { pipeline } = require("stream");

/**
 * uploadProfil
 */
export const uploadProfil = async (req: Request, res: Response) =>  {
    //errors
    try {
        if(
            (req as any).file.detectedMimeType !== "image/jpg" &&
            (req as any).file.detectedMimeType !== "image/png" &&
            (req as any).file.detectedMimeType !== "image/jpeg"
        )
        throw Error("invalid file"); 

        if ((req as any).file.size > 500000) throw Error("max size");
    } catch(err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
    }

    //No errors
    const fileName = (req as any).body.name + ".jpg";

    await pipeline(
        (req as any).file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        ),
        (err, result) => {
            if(err) console.log("error", err);
        }
    );

    try {
        await UserModel.findByIdAndUpdate(
            (req as any).body.userId,
            { $set: { picture: "./uploads/profil/" + fileName }},
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}