<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useWorkoutStore } from "@/stores/workout";
import { useRefreshTokenStore } from "@/stores/refresh-token";
import { setAuthorizationHeader, logout as sendLogout } from "@/api";

const userStore = useUserStore();
const workoutStore = useWorkoutStore();
const refreshTokenStore = useRefreshTokenStore();
const router = useRouter();

async function logout() {
  try {
    userStore.logout();
    refreshTokenStore.$reset();
    workoutStore.$reset();
    setAuthorizationHeader(null);
    await sendLogout();
    router.push({ name: "Login" });
  } catch (err) {
    console.error(err);
  }
}
</script>
<template>
  <header>
    <div class="container">
      <RouterLink :to="{ name: 'Home' }">
        <h1>Workout Buddy</h1>
      </RouterLink>
      <nav>
        <div v-if="userStore.user">
          <div class="space-x-2">
            <span>{{ userStore.user.email }}</span>
            <button @click="logout">Log out</button>
          </div>
        </div>
        <div v-else>
          <RouterLink :to="{ name: 'Login' }">Login</RouterLink>
          <RouterLink :to="{ name: 'Signup' }">Signup</RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
}
nav a {
  margin-left: 10px;
}
nav button {
  background: #fff;
  color: var(--primary);
  border: 2px solid var(--primary);
  padding: 6px 10px;
  border-radius: 4px;
  font-family: "Poppins";
  cursor: pointer;
  font-size: 1em;
}
</style>
