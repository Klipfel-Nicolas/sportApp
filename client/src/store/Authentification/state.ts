import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";
import axios from "axios";

const currentUser = localStorage.getItem("user");
let user;
if (!currentUser) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(currentUser);
    axios.defaults.headers.common["Authorization"] = user.token;
  } catch (err) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

const state = {
  status: "",
  user: user,
  user_infos: {},
};

export type State = typeof state;
export type User = typeof state.user;
export interface UserInfosInterface {
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
