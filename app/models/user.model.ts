import { Schema, model, connect } from 'mongoose';
import * as bcryptjs from 'bcrypt';
const { isEmail } = require("validator");

interface IUser {
  pseudo: string;
  email: string;
  password: string;
  picture?: string;
  bio?: string;
  followers?: [string];
  followings?: [string];
  likes?: [string];
}

const UserSchema = new Schema<IUser>(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    followings: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Password encrypt
 */
 UserSchema.pre('save', async function(next){
  const salt = await bcryptjs.genSalt();
  this.password = await bcryptjs.hash(this.password, salt);
  next();
})

/**
 * Password compare authentification
 */
 UserSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email});

  if(user) {
    const auth = await bcryptjs.compare(password, user.password);

    if(auth) {
      return user;
    }
    throw Error('Incorect password')
  }
  throw Error('Incorect email')
}

export const UserModel = model<IUser>('user', UserSchema);
