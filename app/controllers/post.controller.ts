import { Request, Response } from "express";
import  {PostModel}  from "../models/post.model";
import { UserModel } from "../models/user.model";
import * as fs from 'fs';
import { uploadErrors } from "../utils/errors.utils";
const { pipeline } = require('stream');
const ObjectId = require("mongoose").Types.ObjectId;

/**
 * Get all Post
 * @param {*} req
 * @param {*} res
 */
 export const readPost = async (req: Request, res: Response) =>  {
  const posts = await PostModel.find();
  res.status(201).json(posts);
};

/**
 * Create new Post
 * @param {*} req
 * @param {*} res
 */
 export const createPost = async (req: Request, res: Response) =>  {
  let fileName;

  //FILES UPLOAD
  if ((req as any).file) {
    try {
      if (
        (req as any).file.detectedMimeType !== "image/jpg" &&
        (req as any).file.detectedMimeType !== "image/png" &&
        (req as any).file.detectedMimeType !== "image/jpeg"
      )
        throw Error("invalid file"); //Throw arrete imediatement le try et renvois au catch

      if ((req as any).file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }

    fileName = req.body.posterId + Date.now() + ".jpg";

    pipeline(
      (req as any).file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      ),
      (err, result) => {
        if (err) console.log("error", err);
      }
    );
  }

  //CREATE NEW POST
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: (req as any).file ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

/**
 * Update Post
 * @param {*} req
 * @param {*} res
 * @returns
 */
 export const updatePost = async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: { message: req.body.message } },
    { new: true }
  )
    .then((docs) => res.send(docs))
    .catch((err) => res.status(500).send({ message: err }));
};

/**
 * Delete Post
 * @param {*} req
 * @param {*} res
 * @returns
 */
 export const deletePost = async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  await PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Deleted error : " + err);
  });
};

/* ---------------------------------------
Likes
---------------------------------------- */

/**
 * Like a post
 * @param {*} req
 * @param {*} res
 * @returns
 */
 export const likePost = async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }
    ).catch((err) => res.status(400).send({ err }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).json({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/**
 * Unlike a post
 * @param {*} req
 * @param {*} res
 * @returns
 */
 export const unlikePost = async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
    ).catch((err) => res.status(400).send({ err }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(400).send({ err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/* ---------------------------------------
Comments
---------------------------------------- */

/**
 * Add Comments to post
 * @param {*} req
 * @param {*} res
 * @returns
 */
 export const commentPost = async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.pseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

/**
 * Edit Comment
 * @param {*} req
 * @param {*} res
 */
 export const editCommentPost = async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");

      theComment.text = req.body.text;
      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

/**
 * Delete Comment
 * @param {*} req
 * @param {*} res
 */
 export const deleteCommentPost = (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
