import { Mutation } from "./mutations";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionContext, ActionTree } from "vuex";
import { State } from "./state";
import axios from "axios";

type AugmentedActionContext = {
  commit<K extends keyof Mutation>(
    key: K,
    payload: Parameters<Mutation[K]>[1]
  ): ReturnType<Mutation[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.CREATE_USER_ACCOUNT](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<any>;
  [ActionTypes.LOGIN_USER](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<any>;
  [ActionTypes.SET_USER](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<any>;
}

export const actions: ActionTree<State, State> & Actions = {
  /**
   * CREATE ACCOUNT NEW USER
   * @param commit
   * @param userInfos
   */
  async [ActionTypes.CREATE_USER_ACCOUNT]({ commit }, userInfos) {
    commit(MutationTypes.SET_USER_STATUS, "loading");

    return await axios
      .post(`${process.env.VUE_APP_API_URL}/api/user/register`, userInfos)
      .then((res) => {
        if (!res.data.errors) {
          commit(MutationTypes.SET_USER_STATUS, "created");
        } else {
          commit(MutationTypes.SET_USER_STATUS, "error_create");
        }

        return res;
      })
      .catch((err) => {
        commit(MutationTypes.SET_USER_STATUS, "error_create");
        return err;
      });
  },

  /**
   * LOG IN USER
   * @param commit
   * @param userInfos
   * @returns
   */
  async [ActionTypes.LOGIN_USER]({ commit }, userInfos) {
    commit(MutationTypes.SET_USER_STATUS, "loading");

    return await axios
      .post(`${process.env.VUE_APP_API_URL}/api/user/login`, userInfos, {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.errors) {
          commit(MutationTypes.SET_USER_STATUS, "Connected");
          commit(MutationTypes.LOGIN_USER, res.data);
        } else {
          commit(MutationTypes.SET_USER_STATUS, "error_login");
        }
        return res;
      })
      .catch((err) => {
        commit(MutationTypes.SET_USER_STATUS, "error_login");
        return err;
      });
  },

  /**
   * SET USER
   * @param commit
   * @returns
   */
  async [ActionTypes.SET_USER]({ commit }, userId) {
    return await axios
      .get(`${process.env.VUE_APP_API_URL}/api/user/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        commit(MutationTypes.SET_USER_INFOS, res.data);
      })
      .catch((err) => {
        commit(MutationTypes.SET_USER_INFOS, {});
        console.log(err);
      });
  },
};
