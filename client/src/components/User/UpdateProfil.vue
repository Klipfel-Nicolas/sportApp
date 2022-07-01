<template>
  <div>This is the profile page from {{}}</div>

  <button @click="logout">DECONEXION</button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { MutationTypes } from "@/store/Authentification/mutation-types";
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  name: "ProfilPage",

  setup() {
    const store = useStore();

    const currentUser = computed(() => store.state.Authentification.user);

    const logout = async () => {
      store.commit(MutationTypes.LOGOUT_USER);
      await axios
        .get(`${process.env.VUE_APP_API_URL}/api/user/logout`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
        });
    };

    return {
      currentUser,
      logout,
    };
  },
});
</script>
