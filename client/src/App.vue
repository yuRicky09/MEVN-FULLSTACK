<script setup lang="ts">
import Spinner from "@/assets/svg/spinner.svg";
</script>

<template>
  <div>
    <TheNavbar />
    <div class="pages">
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
