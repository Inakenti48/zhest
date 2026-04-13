import { Database } from 'bun:sqlite';
import path from 'path';

// Database configurations
const isPostgres = !!process.env.DATABASE_URL;

let db: any;

if (isPostgres) {
  const { Pool } = require('pg');
  const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
  };
  const pool = new Pool(config);
  
  // Wrapper to mimic better-sqlite3 interface for compatibility
  db = {
    prepare: (sql: string) => {
      // Basic conversion of SQLite ? to Postgres $1, $2...
      let pgSql = sql;
      let paramCount = 0;
      pgSql = pgSql.replace(/\?/g, () => {
        paramCount++;
        return `$${paramCount}`;
      });

      return {
        get: async (...params: any[]) => {
          const res = await pool.query(pgSql, params);
          return res.rows[0];
        },
        all: async (...params: any[]) => {
          const res = await pool.query(pgSql, params);
          return res.rows;
        },
        run: async (...params: any[]) => {
          const res = await pool.query(pgSql, params);
          return { lastInsertRowid: null, changes: res.rowCount };
        }
      };
    },
    exec: async (sql: string) => {
      await pool.query(sql);
    }
  };
} else {
  // Fallback to SQLite using Bun's native driver
  const dbPath = path.resolve(process.cwd(), 'zhest.db');
  const sqlite = new Database(dbPath);
  
  db = {
    prepare: (sql: string) => {
      const query = sqlite.query(sql);
      return {
        get: async (...params: any[]) => query.get(...params),
        all: async (...params: any[]) => query.all(...params),
        run: async (...params: any[]) => {
          const result = query.run(...params) as { lastInsertRowid: number | bigint, changes: number };
          return { lastInsertRowid: Number(result.lastInsertRowid), changes: result.changes };
        }
      };
    },
    exec: async (sql: string) => {
      sqlite.exec(sql);
    }
  };
}

export default db;
export { isPostgres };
