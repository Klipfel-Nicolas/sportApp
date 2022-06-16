<template>
  <div class="authentification-forms">
    <ul>
      <li id="signUp" @click="switchFormType('signUp')">S'inscrire</li>
      <li id="signIn" @click="switchFormType('signIn')">Se connecter</li>
    </ul>

    <SignForm :classFormType="signFormType" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SignForm from "@/includes/Authentification/SignForm/SignForm.vue";
import { FormTypeTerm } from "@/types/Authentification";

export default defineComponent({
  name: "LogComponent",

  components: {
    SignForm,
  },

  setup() {
    let signFormType = ref<FormTypeTerm>("signIn");

    //Method to switch between logIn and signIn
    const switchFormType = (term: FormTypeTerm) => {
      signFormType.value = term;
    };

    return {
      signFormType,
      switchFormType,
    };
  },
});
</script>
