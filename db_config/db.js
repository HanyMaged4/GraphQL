const pkg=require('pg');
const { Pool } = pkg; 
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'newspaper_DB',
    password: '123',
    port: 5432,
});
module.exports= db;
