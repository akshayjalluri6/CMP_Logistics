import pool from "../db.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserModel = {
    async createUsersTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS users(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                first_name VARCHAR(50) NOT NULL,
                middle_name VARCHAR(50),
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                phone_no VARCHAR(15) NOT NULL UNIQUE,
                address VARCHAR(255) NOT NULL,
                role VARCHAR(20) NOT NULL
            );
        `;

        try {
            await pool.query(query);
            console.log('Users table created');
        } catch (error) {
            console.log(`Error creating users table: ${error}`);
        }
    },

    async addUser(first_name, middle_name, last_name, email, password, phone_no, role, address) {
        const hashedPassword = await bcryptjs.hash(password, 10);

        const query = `
            INSERT INTO users(first_name, middle_name, last_name, email, password, phone_no, role, address)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

        try {
            const values = [first_name, middle_name, last_name, email, hashedPassword, phone_no, role, address];
            const result = await pool.query(query, values);
            return "User created successfully";
        } catch (error) {
            throw error;
        }
    },

    async userLogin(email, password){
        const query = `
            SELECT * FROM users
            WHERE email = $1;
        `;

        try {
            const user = await pool.query(query, [email]);
            if(user.rows.length === 0){
                throw new Error("User not found");
            }
            const isPasswordValid = await bcryptjs.compare(password, user.rows[0].password);
            if(!isPasswordValid){
                throw new Error("Invalid password");
            }

            //Genrate JWT Token
            const payload = {
                id: user.rows[0].id,
                role: user.rows[0].role
            }
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30d'});
            return jwtToken;
        } catch (error) {
            throw error
        }
    }
}

export default UserModel;