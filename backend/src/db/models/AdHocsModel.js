import pool from "../db.js";

const AdHocsModel = {
    async createAdhocsTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS adhocs(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                client_name VARCHAR(50) NOT NULL,
                initial_kms NUMERIC NOT NULL,
                vehicle_no VARCHAR(50) NOT NULL,
                vehicle_type VARCHAR(50) NOT NULL,
                driver_name VARCHAR(50) NOT NULL,
                vendor_id UUID,
                start_date DATE,
                created_by UUID NOT NULL,
                update_by UUID NOT NULL,
                FOREIGN KEY (created_by) REFERENCES users(id),
                FOREIGN KEY (update_by) REFERENCES users(id),
                FOREIGN KEY (vendor_id) REFERENCES vendors(id)
        );
        `;

        try {
            await pool.query(query);
            console.log('Adhocs table created');
        } catch (error) {
            console.log(`Error creating adhocs table: ${error}`);
        }
    },

    async addRide(client_name, initial_kms, vehicle_no, vehicle_type, driver_name, vendor_id, start_date, created_by) {
        const query = `
            INSERT INTO adhocs (client_name, initial_kms, vehicle_no, vehicle_type, driver_name, vendor_id, start_date, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id;
        `;

        try {
            const values = [client_name, initial_kms, vehicle_no, vehicle_type, driver_name, vendor_id, start_date, created_by];
            const result = await pool.query(query, values);
            console.log('Ride added');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error adding ride: ${error}`);
        }
    },

    async getRides(){
        const query = `
            SELECT * FROM adhocs;
        `;
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting rides: ${error}`);
        }
    },

    async getRidesByDate(date){
        const query = `
            SELECT * FROM adhocs WHERE start_date = $1;
        `;
        try {
            const result = await pool.query(query, [date]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting rides: ${error}`);
        }
    },

    async getRideById(id){
        const query = `
            SELECT * FROM adhocs WHERE id = $1;
        `;
        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error getting ride: ${error}`);
        }
    },

    async updateRide(id, client_name, initial_kms, vehicle_no, vehicle_type, driver_name, vendor_id, start_date, update_by){
        const query = `
            UPDATE adhocs
            SET client_name = $2, initial_kms = $3, vehicle_no = $4, vehicle_type = $5, driver_name = $6, vendor_id = $7, start_date = $8, update_by = $9
            WHERE id = $1
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [id, client_name, initial_kms, vehicle_no, vehicle_type, driver_name, vendor_id, start_date, update_by]);
            console.log('Ride updated');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating ride: ${error}`);
        }
    },

    async deleteRide(id){
        const query = `
            DELETE FROM adhocs
            WHERE id = $1
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [id]);
            console.log('Ride deleted');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error deleting ride: ${error}`);
        }
    }
}

export default AdHocsModel