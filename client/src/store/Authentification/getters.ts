import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  getUserName(state: State): string;
  getUserStatus(state: State): string;
};

export const getters: GetterTree<State, State> & Getters = {
  getUserName: (state) => {
    return state.user_infos.pseudo;
  },

  getUserStatus: (state) => {
    return state.status;
  },
};
