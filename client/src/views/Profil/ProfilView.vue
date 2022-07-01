<template>
  <div class="profil-page">
    <div class="log-container">
      <LogPage v-if="userStatus === -1" />
      <UpdateProfil v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import LogPage from "@/components/Authentification/Log/LogComponent.vue";
import UpdateProfil from "@/components/User/UpdateProfil.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ProfilView",

  components: {
    LogPage,
    UpdateProfil,
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
