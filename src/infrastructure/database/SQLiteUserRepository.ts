import sqlite3 from 'sqlite3';
import { UserRepository } from '../../domain/repositories/UserRepository.js';
import { User, UserCreateRequest } from '../../domain/entities/User.js';

export class SQLiteUserRepository implements UserRepository {
  constructor(private db: sqlite3.Database) {}

  async findByUsername(username: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err: Error | null, row: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row ? { id: row.id, username: row.username, password: row.password } : null);
        }
      );
    });
  }

  async create(user: UserCreateRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [user.username, user.password],
        (err: Error | null) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        }
      );
    });
  }

  async count(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT COUNT(*) as count FROM users',
        (err: Error | null, row: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row?.count || 0);
        }
      );
    });
  }
}
