export interface User {
  id: string;
  username: string;
  email: string;
  // add other fields as needed
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface Login {
  username: string;
  password: string;
}
