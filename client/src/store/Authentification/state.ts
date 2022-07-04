import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";
import axios from "axios";

const state = {
  status: "",
  user_infos: {
    _id: "",
    pseudo: "",
    bio: "",
    email: "",
    picture: "",
    followers: [],
    followings: [],
    likes: [],
    createdAt: "",
  },
};

export type State = typeof state;

export interface UserInfosInterface {
  _id: string;
  pseudo: string;
  bio: string;
  email: string;
  picture: string;
  followers: [];
  followings: [];
  likes: [];
  createdAt: string;
}

export default {
  state,
  getters,
  mutations,
  actions,
};
