import { defineStore } from "pinia";
import { refreshToken, setAuthorizationHeader } from "@/api";

interface RefreshTokenState {
  timer: number | null;
}

export const useRefreshTokenStore = defineStore("refreshToken", {
  state: (): RefreshTokenState => {
    return {
      timer: null,
    };
  },
  actions: {
    silentRefresh(accessTokenExpireIn: number) {
      this.timer = setInterval(async () => {
        const { token } = await refreshToken();
        setAuthorizationHeader(token);
        console.log("Silent refresh!");
      }, accessTokenExpireIn - 500);
    },
    clearSilentRefresh() {
      this.timer && clearInterval(this.timer);
    },
  },
});
