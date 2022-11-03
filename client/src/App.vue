<script setup lang="ts">
import Spinner from "@/assets/svg/spinner.svg";
import { refreshToken, setAuthorizationHeader } from "@/api";
import { useUserStore } from "@/stores/user";
import { useRefreshTokenStore } from "@/stores/refresh-token";

const isChecking = ref(true);
const userStore = useUserStore();
const refreshTokenStore = useRefreshTokenStore();

async function getUser() {
  try {
    const { user, token, accessTokenExpireIn } = await refreshToken();
    userStore.user = user;
    setAuthorizationHeader(token);
    refreshTokenStore.silentRefresh(accessTokenExpireIn);
  } catch (err) {
    console.error(err);
  } finally {
    isChecking.value = false;
  }
}

getUser();
</script>

<template>
  <div>
    <TheNavbar />
    <div v-if="!isChecking" class="pages">
      <RouterView v-slot="{ Component }">
        <Suspense timeout="0">
          <template #default>
            <div>
              <component :is="Component" />
            </div>
          </template>
          <template #fallback>
            <div class="fixed inset-0 grid place-content-center">
              <Spinner />
            </div>
          </template>
        </Suspense>
      </RouterView>
    </div>
  </div>
</template>
