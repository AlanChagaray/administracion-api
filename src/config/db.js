import pg from 'pg';

export const pool = new pg.Pool({
  user: process.env.NODE_ENV === 'production' ? 'postgres' : 'postgres',
  host: process.env.NODE_ENV === 'production' ? 'junction.proxy.rlwy.net' : 'localhost',
  password: process.env.NODE_ENV === 'production' ? 'bBjqXzhJXjyvvnwQzaSAWugRSjmXoGON' : 'alan1414',
  database: process.env.NODE_ENV === 'production' ? 'railway' : 'Administracion',
  port: process.env.NODE_ENV === 'production' ? 26085 : 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
