import axios from "axios";

const request = axios.create({
  baseURL: "/api",
});

// request.interceptors.response.use(
//   (response) => response,
//   (err) => {
//     console.error("Error統一處理", err);
//     // throw new Error(err) 等同於Promise.reject(err)
//     return Promise.reject(err.response.data);
//   }
// );

export { request };
