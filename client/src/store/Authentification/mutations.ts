import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "./state";
import { UserInfosInterface } from "./state";

export type Mutation<S = State> = {
  [MutationTypes.SET_USER_INFOS](state: S, payload: object): void;
  [MutationTypes.SET_USER_STATUS](state: S, payload: string): void;
  [MutationTypes.LOGOUT_USER](state: S): void;
};

export const mutations: MutationTree<State> & Mutation = {
  [MutationTypes.SET_USER_INFOS](state, userInfos: UserInfosInterface) {
    const {
      _id,
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
      _id,
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

  [MutationTypes.LOGOUT_USER](state) {
    state.status = "";
    state.user_infos = {
      _id: "",
      pseudo: "",
      bio: "",
      email: "",
      picture: "",
      followers: [],
      followings: [],
      likes: [],
      createdAt: "",
    };
  },
};
