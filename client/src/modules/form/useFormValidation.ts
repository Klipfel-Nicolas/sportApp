import { reactive } from "vue";
import useValidators from "@/modules/form/Validators";

const errors: { [key: string]: string } = reactive({});
const { isEmpty, minLength, isEmail } = useValidators();

function useFormValidation() {
  const validateNameField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 3);
  };

  const validateEmailField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isEmail(fieldName, fieldValue);
  };

  const validatePasswordField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 8);
  };

  return {
    errors,
    validateNameField,
    validateEmailField,
    validatePasswordField,
  };
}

export default useFormValidation;
