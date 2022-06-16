import { computed } from "vue";

export default function useSubmitButtonState(
  data: { [key: string]: string },
  errors: { [key: string]: string }
) {
  const isButtonDisabled = computed(() => {
    let disabled = true;

    for (const prop in data) {
      if (!data[prop] || errors[prop]) {
        disabled = true;
        break;
      }
      disabled = false;
    }
    return disabled;
  });

  return { isButtonDisabled };
}
