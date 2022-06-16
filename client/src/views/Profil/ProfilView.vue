<template>
  <div class="profil-page">
    <div class="log-container">
      <log-page v-if="userStatus === -1" />
      <profil-page v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import LogPage from "@/components/Authentification/Log/LogComponent.vue";
import ProfilPage from "@/components/User/ProfilPage.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ProfilView",

  components: {
    LogPage,
    ProfilPage,
  },

  setup() {
    const store = useStore();
    const userStatus = computed(() => store.state.Authentification.user.userId);

    return {
      userStatus,
    };
  },
});
</script>
