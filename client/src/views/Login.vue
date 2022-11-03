<script setup lang="ts">
import { reset } from "@formkit/core";
import { login } from "@/api";
import { useErrorHandling } from "@/composables/error-handling";
import { setAuthorizationHeader } from "@/api";
import { useUserStore } from "@/stores/user";
import { useRefreshTokenStore } from "@/stores/refresh-token";

interface LoginFormData {
  email: string;
  password: string;
}

const submitted = ref(false);
const { errorMsg, handleError } = useErrorHandling();
const userStore = useUserStore();
const router = useRouter();
const refreshTokenStore = useRefreshTokenStore();

const submitHandler = async (data: LoginFormData) => {
  try {
    errorMsg.value = "";
    const { token, user, accessTokenExpireIn } = await login(data);

    userStore.user = user;
    submitted.value = true;

    setAuthorizationHeader(token);
    reset("registration-example");
    refreshTokenStore.silentRefresh(accessTokenExpireIn);

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
      <h1 class="my-4 text-2xl">Login!</h1>
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
      </div>

      <FormKit type="submit" label="Register" :disabled="!valid" />
      <pre wrap>{{ value }}</pre>
    </FormKit>
    <div v-if="submitted">
      <h2>Submission successful!</h2>
    </div>
  </div>
</template>
