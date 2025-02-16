import pool from "../db.js";

const MisInputsDataModel = {
    async createMisInputsDataTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS mis_inputs_data(
                id UUID,
                date DATE,
                vehicle_no VARCHAR(50),
                client_name VARCHAR(50),
                client_vehicle_type VARCHAR(50),
                client_kms NUMERIC,
                client_working_hours VARCHAR(10),
                client_working_type VARCHAR(20),
                lane VARCHAR(50),
                tour_id VARCHAR(50),
                running_kms_rates VARCHAR(50),
                running_hours_rate VARCHAR(50),
                fuel_subcharge VARCHAR(50),
                client_tolls VARCHAR(50),
                vendor_tolls VARCHAR(50),
                total VARCHAR(50),
                remarks TEXT,
                created_by UUID,
                update_by UUID,
                PRIMARY KEY (id, date),
                FOREIGN KEY (created_by) REFERENCES users(id),
                FOREIGN KEY (update_by) REFERENCES users(id)
        );
        `;

        try {
            await pool.query(query);
            console.log('Mis_inputs_data table created');
        } catch (error) {
            console.log(`Error creating mis_inputs_data table: ${error}`);
        }
    },

    async addInitialMisInputsData(id, date, vehicle_no, client_name, created_by) {
        const query = `
            INSERT INTO mis_inputs_data(id, date, vehicle_no, client_name, created_by, update_by)
            VALUES($1, $2, $3, $4, $5, $5)
            RETURNING *;
        `;

        try {
            const values = [id, date, vehicle_no, client_name, created_by];
            const result = await pool.query(query, values);
            console.log('Initial mis inputs data added');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error adding initial mis inputs data: ${error}`);
        }
    },

    async updateMisInputsData(id, date, vehicle_no, client_name, client_vehicle_type, client_kms, client_working_hours, client_working_type, lane, tour_id, running_kms_rates, running_hours_rate, fuel_subcharge, client_tolls, vendor_tolls, total, remarks, update_by) {
        const query = `
            UPDATE mis_inputs_data
            SET vehicle_no = $3, client_name = $4, client_vehicle_type = $5, client_kms = $6, client_working_hours = $7, client_working_type = $8, lane = $9, tour_id = $10, running_kms_rates = $11, running_hours_rate = $12, fuel_subcharge = $13, client_tolls = $14, vendor_tolls = $15, total = $16, remarks = $17, update_by = $18
            WHERE id = $1 AND date = $2
            RETURNING *;
        `;

        try {
            const values = [id, date, vehicle_no, client_name, client_vehicle_type, client_kms, client_working_hours, client_working_type, lane, tour_id, running_kms_rates, running_hours_rate, fuel_subcharge, client_tolls, vendor_tolls, total, remarks, update_by];
            const result = await pool.query(query, values);
            console.log('Mis inputs data updated');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating mis inputs data: ${error}`);
        }
    },

    async getMisInputsDataByIdAndDate(id, date) {
        const query = `
            SELECT * FROM mis_inputs_data
            WHERE id = $1 AND date = $2;
        `;

        try {
            const result = await pool.query(query, [id, date]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting mis inputs data: ${error}`);
        }
    },

    async getMisInputsDataByDate(date) {
        const query = `
            SELECT * FROM mis_inputs_data
            WHERE date = $1;
        `;

        try {
            const result = await pool.query(query, [date]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting mis inputs data: ${error}`);
        }
    },

    async getMisInputsData() {
        const query = `
            SELECT * FROM mis_inputs_data;
        `;

        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting mis inputs data: ${error}`);
        }
    },

    async deleteMisInputsData(id, date){
        const query = `
            DELETE FROM mis_inputs_data
            WHERE id = $1 AND date = $2
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [id, date]);
            console.log('Mis inputs data deleted');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error deleting mis inputs data: ${error}`);
        }
    }
}

export default MisInputsDataModel;