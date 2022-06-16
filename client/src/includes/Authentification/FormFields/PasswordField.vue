<template>
  <div class="input-container">
    <label for="email">{{ inputWording }}</label>
    <input
      type="password"
      :name="$props.passwordType"
      :id="$props.passwordType"
      v-model="input"
      autocomplete="off"
      @keyup="validateInput"
      @blur="validateInput"
      @focus="$emit('removeResponseError', $event.target)"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <div v-if="responseError !== ''">
      {{ responseError }}
    </div>
    <div v-else-if="passwordType === 'password'" class="password error">
      {{ errors.password }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import useFormValidation from "@/modules/form/useFormValidation";
import { PasswordTypeInput } from "@/types/Authentification";

export default defineComponent({
  name: "PasswordField",

  props: {
    passwordType: {
      type: String as PropType<PasswordTypeInput>,
      default: "password",
    },
    responseError: {
      type: String as PropType<string>,
      default: "",
    },
  },

  setup(props) {
    let input = ref("");
    let inputWording: string =
      props.passwordType === "password"
        ? "Mot de passe"
        : "Confirmer mot de passe";
    const { validatePasswordField, errors } = useFormValidation();

    const validateInput = () => {
      validatePasswordField(props.passwordType, input.value);
    };

    return {
      input,
      errors,
      validateInput,
      inputWording,
    };
  },
});
</script>

<style scoped></style>
