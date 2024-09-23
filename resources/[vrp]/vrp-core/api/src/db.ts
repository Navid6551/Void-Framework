import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'shit',
    password: 'Navid1245',
    database: 'ahvaz_rp',
});

export default pool.promise();
