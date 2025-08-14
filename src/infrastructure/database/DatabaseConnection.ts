import sqlite3 from 'sqlite3';

export class DatabaseConnection {
  private static instance: sqlite3.Database;

  static getInstance(): sqlite3.Database {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new sqlite3.Database('users.db', (err) => {
        if (err) {
          console.error('Error al abrir la base de datos:', err.message);
        } else {
          console.log('Conectado a la base de datos SQLite');
          DatabaseConnection.instance.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
          )`);
        }
      });
    }
    return DatabaseConnection.instance;
  }
}
