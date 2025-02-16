import pkg from 'pg';
const { Pool } = pkg;

import {configDotenv} from 'dotenv'
configDotenv();

const pool = new Pool({
    connectionString: process.env.DB_URL
})

pool.connect()
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log('Error connecting to database', err);
        process.exit(1);
    });

export default pool;