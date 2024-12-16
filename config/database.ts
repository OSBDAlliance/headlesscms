import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from './environment';

// Create a connection pool
const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Connected to database');
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
})();

export default db;
