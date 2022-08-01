export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface Token {
  token: string;
}

export interface LoginRequest {
  email: string;
}
