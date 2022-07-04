import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
const ObjectID = require("mongoose").Types.ObjectId;

/**
 * Get All Users List
 * @param {*} req
 * @param {*} res 
 */
 export const getAllUsers = async (req: Request, res: Response) => {
  console.log('here or not')
  const users = await UserModel.find().select("-password");
  res.status(201).json(users);
};

/**
 * User Info
 * @param {params.id} req
 * @param {docs} res
 * @returns 
 */
 export const userInfo = async (req: Request, res: Response) =>  {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID unknow : ${req.params.id}`);
  }

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log(`ID unknow : ${err}`);
  }).select("-password");
};

/**
 * Update User Bio
 * @param {params.id, bio} req
 * @param {*} res
 * @returns
 */
 export const updateUser = async (req: Request, res: Response) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID unknow : ${req.params.id}`);
  }

  try {
    await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

/**
 * Delete User
 * @param {params.id} req
 * @param {json} res
 * @returns
 */
 export const deleteUser = async (req: Request, res: Response) =>  {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`Id Unknown : ${req.params.id}`);
  }

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/**
 * Follow User
 * @param {id.params, idToFollow} req
 * @param {docs} res
 * @returns
 */
 export const followUser = async (req: Request, res: Response) =>  {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  ) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  try {
    //Add to following list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { followings: req.body.idToFollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).json(docs))
      .catch((err) => res.status(400).json(err));

    //Add to followers list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    ).catch((err) => res.status(400).json(err));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/**
 * Unfollow User
 * @param {*} req
 * @param {*} res
 */
 export const unfollowUser = async (req: Request, res: Response) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  ) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { followings: req.body.idToUnfollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).json(docs))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    return res.status(500).json({ message: err });
  }

  try {
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    ).catch((err) => res.status(400).json(err));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
