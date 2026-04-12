import { Pool, PoolConfig } from 'pg';
import Database from 'better-sqlite3';
import path from 'path';

// Database configurations
const isPostgres = !!process.env.DATABASE_URL;

let db: any;

if (isPostgres) {
  const config: PoolConfig = {
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
  // Fallback to SQLite
  const dbPath = path.resolve(process.cwd(), 'zhest.db');
  db = new Database(dbPath);
  
  // Sync wrapper
  const originalPrepare = db.prepare.bind(db);
  db.prepare = (sql: string) => {
    const stmt = originalPrepare(sql);
    return {
      get: async (...params: any[]) => stmt.get(...params),
      all: async (...params: any[]) => stmt.all(...params),
      run: async (...params: any[]) => stmt.run(...params)
    };
  };
  
  const originalExec = db.exec.bind(db);
  db.exec = async (sql: string) => originalExec(sql);
}

export default db;
export { isPostgres };
