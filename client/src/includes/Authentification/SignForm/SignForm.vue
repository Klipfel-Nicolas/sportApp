<template>
  <div>
    <form action="" @submit.prevent="checkForm" id="sign-form">
      <!-- Pseudo -->
      <PseudoField
        v-if="classFormType === 'signUp'"
        v-model="inputData.pseudo"
      />
      <div>{{ inputData.pseudo }}</div>
      <!-- Email -->
      <EmailField
        :responseError="emailError"
        @removeResponseError="removeResponseMessage"
        v-model="inputData.email"
      />

      <!-- Password -->
      <PasswordField
        passwordType="password"
        :responseError="passwordError"
        @removeResponseError="removeResponseMessage"
        v-model="inputData.password"
      />

      <!-- Confirm Password -->
      <PasswordField
        v-if="classFormType === 'signUp'"
        passwordType="password-confirm"
        :responseError="confirmError"
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
import useFormValidation from "@/modules/form/useFormValidation";
import useSubmitButtonState from "@/modules/button/useSubmitButtonState";
import { FormTypeTerm } from "@/types/Authentification";
import { useStore } from "vuex";
import { ActionTypes } from "@/store/Authentification/action-types";

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
    const store = useStore();

    //formData
    let inputData = reactive({
      pseudo: "",
      email: "",
      password: "",
      confirm: "",
    });

    //Errors from server
    let emailError = ref("");
    let passwordError = ref("");
    let confirmError = ref("");

    /* -------------------------
      Methods Handle Form
    ------------------------- */
    const checkForm = () => {
      if (props.classFormType === "signUp") {
        signUp();
      } else if (props.classFormType === "signIn") {
        signIn();
      }
    };

    const removeResponseMessage = (target: HTMLFormElement) => {
      if (target.id === "email") emailError.value = "";
      if (target.id === "password") passwordError.value = "";
      if (target.id === "password-confirm") confirmError.value = "";
    };

    /* -------------------------
      Methods Authentification
    ------------------------- */
    const signUp = () => {
      if (inputData.password === inputData.confirm) {
        store
          .dispatch(ActionTypes.CREATE_USER_ACCOUNT, {
            pseudo: inputData.pseudo,
            email: inputData.email,
            password: inputData.password,
          })
          .then((response) => {
            if (response.data.errors) {
              emailError.value = response.data.errors.email;
              passwordError.value = response.data.errors.password;
            } else {
              signIn();
            }
          }),
          (error: string) => {
            console.error(error);
          };
      } else {
        confirmError.value = "Les mots de passe ne correspondent pas";
      }
    };

    const signIn = () => {
      store
        .dispatch(ActionTypes.LOGIN_USER, {
          email: inputData.email,
          password: inputData.password,
        })
        .then((response) => {
          if (response.data.errors) {
            emailError.value = response.data.errors.email;
            passwordError.value = response.data.errors.password;
          }
        });
    };

    //Button disabled
    const { errors } = useFormValidation();
    const { isButtonDisabled } = useSubmitButtonState(inputData, errors);

    return {
      inputData,
      emailError,
      passwordError,
      confirmError,
      checkForm,
      removeResponseMessage,
      isButtonDisabled,
    };
  },
});
</script>
