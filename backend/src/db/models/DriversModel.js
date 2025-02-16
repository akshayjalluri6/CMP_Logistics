import pool from "../db.js";

const DriversModel = {
    async createDriversTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS drivers(
            license_no VARCHAR(50) PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            phone_no VARCHAR(15) NOT NULL UNIQUE,
            address VARCHAR(255) NOT NULL,
            status VARCHAR(50) NOT NULL DEFAULT 'available',
            created_by UUID NOT NULL,
            update_by UUID NOT NULL,
            FOREIGN KEY (created_by) REFERENCES users(id),
            FOREIGN KEY (update_by) REFERENCES users(id)
        );
        `;

        try {
            await pool.query(query);
            console.log('Drivers table created');
        } catch (error) {
            console.log(`Error creating drivers table: ${error}`);
        }
    },

    async addDriver(license_no, name, phone_no, address, status, created_by) {
        const query = `
            INSERT INTO drivers(license_no, name, phone_no, address, status, created_by, update_by)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;

        try {
            const result = await pool.query(query, [license_no, name, phone_no, address, status, created_by, created_by]);
            console.log('Driver added');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error adding driver: ${error}`);
        }
    },

    async updateDriver(license_no, name, phone_no, address, update_by, status) {
        const query = `
            UPDATE drivers
            SET name = $2, phone_no = $3, address = $4, status = $5, update_by = $6
            WHERE license_no = $1
            RETURNING *;
        `;

        try {
            const result = await pool.query(query, [license_no, name, phone_no, address, status, update_by]);
            console.log('Driver updated');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating driver: ${error}`);
        }
    },

    async getDriverDetails(license_no) {
        const query = `
            SELECT * FROM drivers
            WHERE license_no = $1;
        `;
        try {
            const result = await pool.query(query, [license_no]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error getting driver details: ${error}`);
        }
    },

    async getDrivers() {
        const query = `
            SELECT * FROM drivers;
        `;
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting drivers: ${error}`);
        }
    },

    async deleteDriver(license_no) {
        const query = `
            DELETE FROM drivers
            WHERE license_no = $1
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [license_no]);
            console.log('Driver deleted');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error deleting driver: ${error}`);
        }
    },

    async updateDriverStatus(license_no, status, update_by) {
        const query = `
            UPDATE drivers
            SET status = $2, update_by = $3
            WHERE license_no = $1
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [license_no, status, update_by]);
            console.log('Driver status updated');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating driver status: ${error}`);
        }
    },

    async resetDriversStatus(){
        const query = `
            UPDATE drivers
            SET status = 'available'
            WHERE status = 'on-duty'
            RETURNING *;
        `;
        try {
            await pool.query(query);
            console.log('Drivers status reset');
        } catch (error) {
            throw new Error(`Error resetting drivers status: ${error}`);
        }
    }

}

export default DriversModel;