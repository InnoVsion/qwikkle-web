export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
