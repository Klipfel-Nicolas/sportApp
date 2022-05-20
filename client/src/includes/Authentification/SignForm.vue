<template>
  <div>
    <form action="" id="sign-up-form">
      <!-- Pseudo -->
      <div class="input-container">
        <label for="pseudo">Pseudo</label>
        <input type="text" name="pseudo" id="pseudo" />
        <div class="pseudo error"></div>
      </div>

      <!-- Email -->
      <div class="input-container">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" />
        <div class="email error"></div>
      </div>

      <!-- Password -->
      <div class="input-container">
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password" />
        <div class="password error"></div>
      </div>

      <!-- Confirm Password -->
      <div v-if="classFormType === 'signUp'" class="input-container">
        <label for="password-conf">Confirmer mot de passe</label>
        <input type="password" name="password" id="password-conf" />
        <div class="password-confirm error"></div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { prop, Vue } from "vue-class-component";

class Props {
  classFormType = prop({
    type: String,
    default: "signUp",
  });
}

export default class SignForm extends Vue.with(Props) {}
</script>
