import pg from 'pg';

export const pool = new pg.Pool({
    user : 'postgres',
    host : 'localhost',
    password : 'alan1414',
    database : 'Administracion',
    port : '5432'
});
