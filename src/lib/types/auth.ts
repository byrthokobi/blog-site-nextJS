export interface LoginRequest {
  email: string;
  password: string;
}

export interface PayloadSession {
  id: string;
  createdAt: string;
  expiresAt: string;
}

export interface Avatar {
  url: string;
}

export interface User {
  firstName?: string;
  lastName?: string;
  role: string;
  email: string;
  sessions: PayloadSession[];
  avatar?: Avatar;
  id: string;
}

export interface LoginResponse {
  user: User;
}
