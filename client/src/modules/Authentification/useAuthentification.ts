import { useStore } from "vuex";
import { reactive } from "vue";
import { ActionTypes } from "@/store/Authentification/action-types";
import { FormTypeTerm } from "@/types/Authentification";

function useAuthentification() {
  const store = useStore();
  const errorsMessage: { [key: string]: string } = reactive({});

  const postForm = (logForm: FormTypeTerm, data: any) => {
    if (logForm === "signUp") {
      signUp(data);
    } else if (logForm === "signIn") {
      signIn(data);
    }
  };

  /* -------------------------
        Methods Authentification
      ------------------------- */
  const signUp = (data: any) => {
    if (data.password === data.confirm) {
      store
        .dispatch(ActionTypes.CREATE_USER_ACCOUNT, {
          pseudo: data.pseudo,
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          if (response.data.errors) {
            errorsMessage.emailError = response.data.errors.email;
            errorsMessage.passwordError = response.data.errors.password;
          } else {
            signIn(data);
          }
        }),
        (error: string) => {
          console.error(error);
        };
    } else {
      errorsMessage.confirmError = "Les mots de passe ne correspondent pas";
    }
  };

  const signIn = (data: any) => {
    store
      .dispatch(ActionTypes.LOGIN_USER, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        if (response.data.errors) {
          errorsMessage.emailError = response.data.errors.email;
          errorsMessage.passwordError = response.data.errors.password;
        } else {
          //Set user Infos
          store.dispatch(ActionTypes.SET_USER, response.data.userId);
        }
      });
  };

  return {
    postForm,
    errorsMessage,
  };
}

export default useAuthentification;
