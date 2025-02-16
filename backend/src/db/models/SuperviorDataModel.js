import pool from "../db.js";
import VendorModel from "./VendorsModel.js";

const SuperviorDataModel = {
    async createSupervisorDataTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS supervisor_data(
                id UUID,
                date DATE,
                client_name VARCHAR(50),
                vendor_name VARCHAR(50),
                vehicle_no VARCHAR(50),
                vehicle_type VARCHAR(50),
                working_hours VARCHAR(10),
                working_type VARCHAR(20),
                running_kms NUMERIC,
                lane VARCHAR(50),
                tour_id VARCHAR(50),
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
            console.log('Supervisor_data table created');
        } catch (error) {
            console.log(`Error creating supervisor_data table: ${error}`);
        }
    },

    async addInitialLogData(id, date, client_name, vendor_id, vehicle_no, created_by){
        const vendor_name = await VendorModel.getVendorDetails(vendor_id);
        
        const query = `
            INSERT INTO supervisor_data(id, date, client_name, vendor_name, vehicle_no, created_by, update_by)
            VALUES($1, $2, $3, $4, $5, $6, $6)
            RETURNING *;
        `;

        try {
            const values = [id, date, client_name, vendor_name.name, vehicle_no, created_by];
            const result = await pool.query(query, values);
            console.log('Initial log data added');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error adding initial log data: ${error}`);
        }
    },

    async updateLogData(id, date, client_name, vendor_name, vehicle_no, vehicle_type, working_hours, working_type, running_kms, lane, tour_id, remarks, update_by) {
        const query = `
            UPDATE supervisor_data
            SET client_name = $3, vendor_name = $4, vehicle_no = $5, vehicle_type = $6, working_hours = $7, working_type = $8, running_kms = $9, lane = $10, tour_id = $11, remarks = $12, update_by = $13
            WHERE id = $1 AND date = $2
            RETURNING *;
        `;

        try {
            const values = [id, date, client_name, vendor_name, vehicle_no, vehicle_type, working_hours, working_type, running_kms, lane, tour_id, remarks, update_by];
            const result = await pool.query(query, values);
            console.log('Log data updated');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating log data: ${error}`);
        }
    },

    async getLogDataByIdAndDate(id, date) {
        const query = `
            SELECT * FROM supervisor_data
            WHERE id = $1 AND date = $2;
        `;

        try {
            const result = await pool.query(query, [id, date]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error getting log data: ${error}`);
        }
    },

    async getLogDataByDate(date) {
        const query = `
            SELECT * FROM supervisor_data
            WHERE date = $1;
        `;

        try {
            const result = await pool.query(query, [date]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting log data: ${error}`);
        }
    },

    async getLogsData() {
        const query = `
            SELECT * FROM supervisor_data;
        `;

        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting log data: ${error}`);
        }
    }
}

export default SuperviorDataModel