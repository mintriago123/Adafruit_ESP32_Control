export interface User {
  id?: number;
  username: string;
  password: string;
}

export interface UserCreateRequest {
  username: string;
  password: string;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}
