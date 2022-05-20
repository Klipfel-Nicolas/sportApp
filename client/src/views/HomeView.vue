<template>
  <div class="home">
    <h1>SportApp</h1>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios from "axios";

export default class HomeView extends Vue {
  created() {
    const data = axios({
      method: "get",
      url: `${process.env.VUE_APP_API_URL}/api/user`,
    });
  }
}
</script>
