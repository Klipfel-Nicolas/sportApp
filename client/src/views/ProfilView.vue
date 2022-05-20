<template>
  <div class="profil-page">
    <div className="log-container">
      <Log />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Log from "@/components/Authentification/Log.vue";

@Options({
  components: {
    Log,
  },
})
export default class ProfilView extends Vue {}
</script>
