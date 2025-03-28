export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface UserCredentials {
  email: string;
  password: string;
  username?: string;
}

export interface UserUpdateFields {
  email?: string;
  username?: string;
  password?: string;
  image?: string;
  bio?: string;
}

export interface AuthResponse {
  user: User;
}