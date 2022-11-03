import { request } from "../request";

import type { User } from "@/types";

interface FormData {
  email: string;
  password: string;
}

interface UserInfo {
  user: User;
  token: string;
  accessTokenExpireIn: number;
}

export const signup = async (formData: FormData) => {
  const { data } = await request.post<UserInfo>("/users/signup", formData);

  return data;
};

export const login = async (formData: FormData) => {
  const { data } = await request.post<UserInfo>("/users/login", formData);

  return data;
};

export const logout = async () => {
  await request.post("/users/logout");
};

export const refreshToken = async () => {
  const { data } = await request.post<UserInfo>("/users/refresh");

  return data;
};
