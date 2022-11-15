import axios from "axios";

let myInterceptor: number;
const request = axios.create({
  baseURL: "/api",
});

// 用戶登出or登入 重設置攔截器的headers
function setAuthorizationToken(token: string | null) {
  request.interceptors.request.eject(myInterceptor);
  myInterceptor = request.interceptors.request.use((config) => {
    if (config.headers) {
      token
        ? (config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          })
        : (config.headers = {
            ...config.headers,
          });
    }

    return config;
  });
}

export { request, setAuthorizationToken };
