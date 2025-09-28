export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    fullName: string
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  getUser: () => Promise<void>;
}
