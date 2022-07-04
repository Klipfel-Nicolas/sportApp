<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/profil">Profil</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ActionTypes } from "@/store/Authentification/action-types";

export default {
  name: "App",

  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(async () => {
      try {
        const { data } = await axios.get("user/authentificate");
        store.dispatch(ActionTypes.SET_USER, data._doc._id);
      } catch (error) {
        await router.push("/profil");
      }
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
