import LogComponent from "./LogComponent.vue";

export default {
  title: "Components/Authentification",
  component: LogComponent,
  argTypes: {
    signFormType: {
      name: "signFormType",
      type: { name: "string", required: true },
      defaultValue: "string",
      description: "Formulaire à afficher (Sign-in/Sign-up)",
      table: {
        type: {
          summary: "string",
          detail: "for specification or more information",
        },
        defaultValue: { summary: "signUp" },
      },
      control: {
        type: "text",
      },
    },
  },
};

const Template = (args) => (
  <div>
    <ul>
      <li>S'inscrire</li>
      <li>Se connecter</li>
    </ul>
  </div>
);

export const signUp = Template.bind({});
export const SignIn = Template.bind({});

SignIn.args = {
  signFormType: "signIn",
};

/* export const Logs = (args) => {
  return <div>Hello Sport</div>;
}; */
