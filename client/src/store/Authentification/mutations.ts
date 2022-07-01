import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State, User } from "./state";
import { UserInfosInterface } from "./state";

export type Mutation<S = State> = {
  [MutationTypes.SET_USER_INFOS](state: S, payload: object): void;
  [MutationTypes.SET_USER_STATUS](state: S, payload: string): void;
  [MutationTypes.LOGIN_USER](state: S, payload: User): void;
  [MutationTypes.LOGOUT_USER](state: S, payload: User): void;
};

export const mutations: MutationTree<State> & Mutation = {
  [MutationTypes.SET_USER_INFOS](state, userInfos: UserInfosInterface) {
    const {
      pseudo,
      bio,
      email,
      picture,
      followers,
      followings,
      likes,
      createdAt,
    } = userInfos;

    state.user_infos = {
      pseudo,
      bio,
      email,
      picture,
      followers,
      followings,
      likes,
      createdAt,
    };
  },
  [MutationTypes.SET_USER_STATUS](state, status: string) {
    state.status = status;
  },
  [MutationTypes.LOGIN_USER](state, user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
  [MutationTypes.LOGOUT_USER](state) {
    state.user = {
      userId: -1,
      token: "",
    };
    state.user_infos = {};
    localStorage.removeItem("user");
  },
};
