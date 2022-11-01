<script setup lang="ts">
import { reset } from "@formkit/core";
import { signup } from "@/api";
import { useErrorHandling } from "@/composables/error-handling";
import { useUserStore } from "@/stores/user";
import { setAuthorizationToken } from "@/api";

interface SignupFormData {
  email: string;
  password: string;
  password_confirm: string;
}

const { errorMsg, handleError } = useErrorHandling();
const userStore = useUserStore();
const router = useRouter();
const submitted = ref(false);
const submitHandler = async (data: SignupFormData) => {
  try {
    errorMsg.value = "";
    // If the @submit handler returns a Promise, sets the form’s state to loading until it resolves.
    const { email, password } = data;
    const { user, token } = await signup({ email, password });
    userStore.user = user;
    userStore.token = token;

    submitted.value = true;
    reset("registration-example");
    setAuthorizationToken(token);
    router.push({ name: "Home" });
  } catch (err) {
    handleError(err);
  }
};
</script>

<template>
  <div class="form-layout">
    <FormKit
      id="registration-example"
      #default="{ value, state: { valid } }"
      :actions="false"
      type="form"
      :form-class="submitted ? 'hide' : 'show'"
      submit-label="Register"
      :errors="[errorMsg]"
      @submit="submitHandler"
    >
      <h1 class="my-4 text-2xl">Register!</h1>
      <hr />
      <FormKit
        type="text"
        name="email"
        label="Your email"
        placeholder="jane@example.com"
        help="What email should we use?"
        validation="required|email"
      />
      <div class="double">
        <!-- [^....] Match any character that is not in the set -->
        <FormKit
          type="password"
          name="password"
          label="Password"
          validation="required|length:6|matches:/[^a-zA-Z]/"
          :validation-messages="{
            matches: 'Please include at least one symbol',
          }"
          placeholder="Your password"
          help="Choose a password"
        />
        <FormKit
          type="password"
          name="password_confirm"
          label="Confirm password"
          placeholder="Confirm password"
          validation="required|confirm"
          help="Confirm your password"
        />
      </div>

      <FormKit type="submit" label="Register" :disabled="!valid" />
      <pre wrap>{{ value }}</pre>
    </FormKit>
    <div v-if="submitted">
      <h2>Submission successful!</h2>
    </div>
  </div>
</template>
