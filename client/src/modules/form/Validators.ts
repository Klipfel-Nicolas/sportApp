export default function useValidators() {
  //isEmpty
  const isEmpty = (fieldName: string, fieldValue: string) => {
    return !fieldValue ? "The " + fieldName + " field is required" : "";
  };

  //MinLength
  const minLength = (fieldName: string, fieldValue: string, min: number) => {
    return fieldValue.length < min
      ? `The ${fieldName} field must be atleast ${min} characters long`
      : "";
  };

  //isEmail
  const isEmail = (fieldName: string, fieldValue: string) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !regex.test(fieldValue)
      ? `The input is not a valid ${fieldName} adress`
      : "";
  };
  return { isEmpty, minLength, isEmail };
}
