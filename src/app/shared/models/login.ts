
export interface LoginResponse {
  access_token: string;
  token_type: string;
  id: number;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
export interface RegisterRequest {
  username: string;
  password: string;
}

export interface UserPublic {
  id: number;
  username: string;
}
