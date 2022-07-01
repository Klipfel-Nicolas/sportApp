<template>
  <div>
    <form action="" @submit.prevent="handleSubmit" id="sign-form">
      <!-- Pseudo -->
      <PseudoField
        v-if="classFormType === 'signUp'"
        v-model="inputData.pseudo"
      />
      <div>{{ inputData.pseudo }}</div>
      <!-- Email -->
      <EmailField
        :responseError="errorsMessage.emailError"
        @removeResponseError="removeResponseMessage"
        v-model="inputData.email"
      />

      <!-- Password -->
      <PasswordField
        passwordType="password"
        :responseError="errorsMessage.passwordError"
        @removeResponseError="removeResponseMessage"
        v-model="inputData.password"
      />

      <!-- Confirm Password -->
      <PasswordField
        v-if="classFormType === 'signUp'"
        passwordType="password-confirm"
        :responseError="errorsMessage.confirmError"
        @removeResponseError="removeResponseMessage"
        v-model="inputData.confirm"
      />

      <input
        type="submit"
        :value="classFormType === 'signUp' ? 'S\'inscrire' : 'Se connecter'"
        :disabled="classFormType === 'signUp' ? isButtonDisabled : false"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, reactive } from "vue";
import PseudoField from "@/includes/Authentification/FormFields/PseudoField.vue";
import EmailField from "@/includes/Authentification/FormFields/EmailField.vue";
import PasswordField from "@/includes/Authentification/FormFields/PasswordField.vue";
//modules
import useFormValidation from "@/modules/form/useFormValidation";
import useSubmitButtonState from "@/modules/button/useSubmitButtonState";
import useAuthentification from "@/modules/Authentification/useAuthentification";
//types
import { FormTypeTerm } from "@/types/Authentification";

export default defineComponent({
  name: "SignForm",

  components: { PseudoField, EmailField, PasswordField },

  props: {
    classFormType: {
      type: String as PropType<FormTypeTerm>,
      default: "signIn",
    },
  },

  setup(props) {
    let inputData = reactive({
      pseudo: "",
      email: "",
      password: "",
      confirm: "",
    });

    //Modules
    const { postForm, errorsMessage } = useAuthentification();
    const { errors } = useFormValidation();
    const { isButtonDisabled } = useSubmitButtonState(inputData, errors);

    /* ----------
      Methodes
    ------------*/
    const handleSubmit = () => {
      postForm(props.classFormType, inputData);
    };

    const removeResponseMessage = (target: HTMLFormElement) => {
      if (target.id === "email") errorsMessage.emailError = "";
      if (target.id === "password") errorsMessage.passwordError = "";
      if (target.id === "password-confirm") errorsMessage.confirmError = "";
    };

    return {
      inputData,
      handleSubmit,
      errorsMessage,
      removeResponseMessage,
      isButtonDisabled,
    };
  },
});
</script>
