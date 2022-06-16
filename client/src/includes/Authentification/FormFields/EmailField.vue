<template>
  <div class="input-container">
    <label for="email">Email</label>
    <input
      type="email"
      name="email"
      id="email"
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
    <div v-else class="email error">{{ errors.email }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import useFormValidation from "@/modules/form/useFormValidation";

export default defineComponent({
  name: "EmailField",

  props: {
    responseError: {
      type: String as PropType<string>,
      default: "",
    },
  },

  setup() {
    let input = ref("");
    let displayResponseErrors = ref(true);
    const { validateEmailField, errors } = useFormValidation();

    const validateInput = () => {
      validateEmailField("email", input.value);
    };

    return {
      input,
      displayResponseErrors,
      validateInput,
      errors,
    };
  },
});
</script>
