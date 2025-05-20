export interface User {
  id: string;
  name: string;
  email: string;
  // add other fields as needed
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
