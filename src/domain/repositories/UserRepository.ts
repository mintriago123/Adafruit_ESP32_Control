import { User, UserCreateRequest } from '../entities/User.js';

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  create(user: UserCreateRequest): Promise<void>;
  count(): Promise<number>;
}
