<template>
  <div class="input-container">
    <label for="pseudo">Pseudo</label>
    <input
      type="text"
      name="pseudo"
      id="pseudo"
      v-model="input"
      @keyup="validateInput"
      @blur="validateInput"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <div class="pseudo error">{{ errors.pseudo }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useFormValidation from "@/modules/form/useFormValidation";

export default defineComponent({
  setup() {
    let input = ref("");
    const { validateNameField, errors } = useFormValidation();

    const validateInput = () => {
      validateNameField("pseudo", input.value);
    };

    return {
      input,
      errors,
      validateInput,
    };
  },
});
</script>

<style scoped></style>
