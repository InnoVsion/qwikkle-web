export interface User {
  id: string;
  qkId: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  qkId: string;
  password: string;
}
