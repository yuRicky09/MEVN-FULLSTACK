import { request } from "../request";

import type { User } from "@/types";

interface FormData {
  email: string;
  password: string;
}

interface UserInfo {
  token: string;
  user: User;
}

export const signup = async (formData: FormData) => {
  const { data } = await request.post<UserInfo>("/users/signup", formData);

  return data;
};

export const login = async (formData: FormData) => {
  const { data } = await request.post<UserInfo>("/users/login", formData);

  return data;
};
