export interface User {
  _id: string;
  email: string;
}

export interface UserState {
  user: User | null;
}
