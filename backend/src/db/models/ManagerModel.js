import pool from "../db.js";

const ManagerModel = {
    async createManagerDataTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS manager_data(
                id UUID,
                date DATE,
                vendor_name VARCHAR(50),
                vehicle_no VARCHAR(50),
                kms_difference NUMERIC,
                matching_data_difference VARCHAR(255),
                running_hours_rate_difference NUMERIC,
                working_hours_rate_difference NUMERIC,
                total_vendor_pay NUMERIC,
                total_client_pay NUMERIC,
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
            console.log('Manager_data table created');
        } catch (error) {
            console.log(`Error creating manager_data table: ${error}`);
        }
    },

    async addInitialData(id, date, vendor_name, vehicle_no, created_by){
        const query = `
            INSERT INTO manager_data(id, date, vendor_name, vehicle_no, created_by)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
        `;

        try {
            const values = [id, date, vendor_name, vehicle_no, created_by];
            const result = await pool.query(query, values);
            console.log('Initial data added');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error adding initial data: ${error}`);
        }
    },

    async updateLogData(id, date, vendor_name, vehicle_no, kms_difference, matching_data_difference, running_hours_rate_difference, working_hours_rate_difference, total_vendor_pay, total_client_pay, remarks, update_by){
        const query = `
            UPDATE manager_data
            SET vendor_name=$3, vehicle_no=$4, kms_difference=$5, matching_data_difference=$6, running_hours_rate_difference=$7, working_hours_rate_difference=$8, total_vendor_pay=$9, total_client_pay=$10, remarks=$11, update_by=$12
            WHERE id=$1 AND date=$2
            RETURNING *;
        `;

        try {
            const values = [id, date, vendor_name, vehicle_no, kms_difference, matching_data_difference, running_hours_rate_difference, working_hours_rate_difference, total_vendor_pay, total_client_pay, remarks, update_by];
            const result = await pool.query(query, values);
            console.log('Log data updated');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating log data: ${error}`);
        }
    },

    async getlogs(){
        const query = `
            SELECT * FROM manager_data;
        `;
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting logs: ${error}`);
        }
    },

    async getLogDataByDate(date) {
        const query = `
            SELECT * FROM manager_data
            WHERE date = $1;
        `;

        try {
            const result = await pool.query(query, [date]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting log data: ${error}`);
        }
    },

    async getLogDataByIdAndDate(id, date) {
        const query = `
            SELECT * FROM manager_data
            WHERE id = $1 AND date = $2;
        `;

        try {
            const result = await pool.query(query, [id, date]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting log data: ${error}`);
        }
    }
}

export default ManagerModel