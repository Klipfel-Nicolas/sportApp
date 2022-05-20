<template>
  <div class="authentification-forms">
    <ul>
      <li id="signUp" @click="handleModals">S'inscrire</li>
      <li id="signIn" @click="handleModals">Se connecter</li>
    </ul>

    <SignForm :classFormType="signFormType" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SignForm from "@/includes/Authentification/SignForm.vue";

@Options({
  components: {
    SignForm,
  },
})
export default class Log extends Vue {
  //Datas
  signFormType = "signUp";

  //Methods
  handleModals(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.signFormType = target.id;
  }
}
</script>
