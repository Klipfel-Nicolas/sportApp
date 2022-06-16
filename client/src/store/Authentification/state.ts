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
};

export type State = typeof state;
export type User = typeof state.user;

export default {
  state,
  getters,
  mutations,
  actions,
};
