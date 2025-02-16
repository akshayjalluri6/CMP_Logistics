import pool from "../db.js";

const VendorModel = {
    async createVendorsTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS vendors(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(50) NOT NULL,
                account_no VARCHAR(50) NOT NULL,
                account_holder_name VARCHAR(100) NOT NULL,
                ifsc_code VARCHAR(50) NOT NULL,
                bank_name VARCHAR(100) NOT NULL,
                branch_name VARCHAR(100) NOT NULL,
                phone_no VARCHAR(15) NOT NULL,
                email VARCHAR(50) NOT NULL,
                address VARCHAR(255) NOT NULL,
                created_by UUID NOT NULL,
                update_by UUID NOT NULL,
                FOREIGN KEY (created_by) REFERENCES users(id),
                FOREIGN KEY (update_by) REFERENCES users(id)
            );
        `;

        try {
            await pool.query(query);
            console.log('Vendors table created');
        } catch (error) {
            console.log(`Error creating vendors table: ${error}`);
        }
    },

    async addVendor(name, account_no, account_holder_name, ifsc_code, bank_name, branch_name, phone_no, email, address, created_by) {
        const query = `
            INSERT INTO vendors(name, account_no, account_holder_name, ifsc_code, bank_name, branch_name, phone_no, email, address, created_by, update_by)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *;
        `;

        try {
            const result = await pool.query(query, [name, account_no, account_holder_name, ifsc_code, bank_name, branch_name, phone_no, email, address, created_by, created_by]);
            console.log('Vendor added');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error adding vendor: ${error}`);
        }
    },

    async getVendorDetails(id){
        const query = `
            SELECT * FROM vendors
            WHERE id = $1;
        `;

        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error getting vendor details: ${error}`);
        }
    }
}

export default VendorModel;