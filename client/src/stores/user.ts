import { defineStore } from "pinia";

import type { UserState } from "@/types";

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      user: null,
    };
  },
  actions: {
    logout() {
      this.$reset();
      localStorage.removeItem("user");
    },
  },
  persist: true,
});
