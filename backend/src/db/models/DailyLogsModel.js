import pool from "../db.js";
import BackupsModel from "./BackupsModel.js";
import DriversModel from "./DriversModel.js";
import ManagerModel from "./ManagerModel.js";
import MisInputsDataModel from "./MisInputsDataModel.js";
import SuperviorDataModel from "./SuperviorDataModel.js";
import VehiclesModel from "./VehiclesModel.js";
import VendorModel from "./VendorsModel.js";

const DailyLogsModel = {
    async createDailyLogsTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS daily_logs(
            id UUID,
            date DATE,
            start_time TIME,
            client_name VARCHAR(50),
            vehicle_no VARCHAR(50),
            driver_id VARCHAR(50),
            vendor_id UUID,
            log_status VARCHAR(50) DEFAULT 'present',
            ride_type VARCHAR(50) DEFAULT 'Scheduled',
            created_by UUID,
            update_by UUID,
            PRIMARY KEY (id, date),
            FOREIGN KEY (id) REFERENCES rides(id),
            FOREIGN KEY (driver_id) REFERENCES drivers(license_no),
            FOREIGN KEY (vendor_id) REFERENCES vendors(id),
            FOREIGN KEY (vehicle_no) REFERENCES vehicles(vehicle_no),
            FOREIGN KEY (created_by) REFERENCES users(id),
            FOREIGN KEY (update_by) REFERENCES users(id)
        );
        `;

        try {
            await pool.query(query);
            console.log('Daily_logs table created');
        } catch (error) {
            console.log(`Error creating daily_logs table: ${error}`);
        }
    },

    async addInitialLog(id, date, created_by){
        const query = `
            INSERT INTO daily_logs(id, date, created_by, update_by)
            VALUES($1, $2, $3, $3)
            RETURNING *;
        `
        try {
            const result = await pool.query(query, [id, date, created_by]);
            console.log('Initial log added');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error adding initial log: ${error}`);
        }
    },

    async deleteInitialLog(id){
        const query = `
            DELETE FROM daily_logs
            WHERE id = $1
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [id]);
            console.log('Initial log deleted');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error deleting initial log: ${error}`);
        }
    },

    async todayLogs(date){
        const query = `
            SELECT * FROM daily_logs
            WHERE date = $1;
        `;

        try {
            const result = await pool.query(query, [date]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting today logs: ${error}`);
        }
    },

    async updateLog(id, start_time, client_name, vehicle_no, driver_id, vendor_id, log_status, ride_type, update_by){
        const query = `
            UPDATE daily_logs
            SET start_time = $2, client_name = $3, vehicle_no = $4, driver_id = $5, vendor_id = $6, log_status = $7, ride_type = $8, update_by = $9
            WHERE id = $1
            RETURNING *;
        `;
        const vendor = await VendorModel.getVendorDetails(vendor_id);
        try {
            const result = await pool.query(query, [id, start_time, client_name, vehicle_no, driver_id, vendor_id, log_status, ride_type, update_by]);
            console.log('Log updated');
            await VehiclesModel.updateVehicleStatus(vehicle_no, 'on-duty', update_by);
            await DriversModel.updateDriverStatus(driver_id, 'on-duty', update_by);
            const date = new Date().toISOString().split('T')[0];
            await SuperviorDataModel.addInitialLogData(id, date, client_name, vendor_id, vehicle_no, update_by);
            await MisInputsDataModel.addInitialMisInputsData(id, date, vehicle_no, client_name, update_by);
            await ManagerModel.addInitialData(id, date, vendor.name, vehicle_no, update_by);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating log: ${error}`);
        }
    },

    async updateLogStatus(id, date, log_status, update_by){
        const query = `
            UPDATE daily_logs
            SET log_status = $3, update_by = $4
            WHERE id = $1 AND date = $2
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [id, date, log_status, update_by]);
            console.log('Log status updated');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating log status: ${error}`);
        }
    },

    async getLogByIdAndDate(id, date){
        const query = `
            SELECT * FROM daily_logs
            WHERE id = $1 AND date = $2;
        `;
        try {
            const result = await pool.query(query, [id, date]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting log: ${error}`);
        }
    },

    async getLogs(){
        const query = `
            SELECT * FROM daily_logs;
        `;
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting logs: ${error}`);
        }
    },

    async deleteLog(id, date){
        const query = `
            DELETE FROM daily_logs
            WHERE id = $1 AND date = $2
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [id, date]);
            console.log('Log deleted');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error deleting log: ${error}`);
        }
    },

    async getLastLog(id){
        const query = `
            SELECT * FROM daily_logs
            WHERE id = $1
            ORDER BY date DESC
            LIMIT 1;
        `;

        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error getting last log: ${error}`);
        }
    },

    async addAutoLog(id, date, client_name, vehicle_no, driver_id, vendor_id, log_status, created_by){
        const query = `
            INSERT INTO daily_logs(id, date, client_name, vehicle_no, driver_id, vendor_id, log_status, created_by, update_by)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $8)
            RETURNING *;
        `;

        const vendor = await VendorModel.getVendorDetails(vendor_id);

        try {
            const result = await pool.query(query, [id, date, client_name, vehicle_no, driver_id, vendor_id, log_status, created_by, created_by]);
            console.log('Auto log added');
            await SuperviorDataModel.addInitialLogData(id, date, client_name, vendor_id, vehicle_no, created_by);
            await MisInputsDataModel.addInitialMisInputsData(id, date, vehicle_no, client_name, created_by);
            await ManagerModel.addInitialData(id, date, vendor.name, vehicle_no, created_by);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error adding auto log: ${error}`);
        }
    }
}

export default DailyLogsModel;