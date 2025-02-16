import pool from "../db.js";
import DailyLogsModel from "./DailyLogsModel.js";

const BackupsModel = {
    async createBackupsTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS backups(
                id UUID,
                backup_date DATE,
                backup_time TIME,
                backup_type VARCHAR(50),
                driver_id VARCHAR(50),
                vendor_id UUID,
                vehicle_no VARCHAR(50),
                created_by UUID,
                update_by UUID,
                ride_type VARCHAR(50) DEFAULT 'Scheduled',
                PRIMARY KEY (id, backup_date),
                FOREIGN KEY (driver_id) REFERENCES drivers(license_no),
                FOREIGN KEY (vendor_id) REFERENCES vendors(id),
                FOREIGN KEY (vehicle_no) REFERENCES vehicles(vehicle_no),
                FOREIGN KEY (created_by) REFERENCES users(id),
                FOREIGN KEY (update_by) REFERENCES users(id)
        );
        `;

        try {
            await pool.query(query);
            console.log('Backups table created');
        } catch (error) {
            console.log(`Error creating backups table: ${error}`);
        }
    },

    async addInitialBackup(id, backup_date, backup_type, created_by){
        const query = `
            INSERT INTO backups(id, backup_date, backup_type, created_by, update_by)
            VALUES($1, $2, $3, $4, $4)
            RETURNING *;
        `;

        try {
            const result = await pool.query(query, [id, backup_date, backup_type, created_by]);
            console.log('Initial backup added');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error adding initial backup: ${error}`);
        }
    },

    async updateBackupLogStatus(id, backup_date, log_status){
        const query = `
            UPDATE backups
            SET log_status = $3
            WHERE id = $1 AND backup_date = $2
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [id, backup_date, log_status]);
            console.log('Backup log status updated');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating backup log status: ${error}`);
        }
    },


    async updateBackup(id, backup_date, backup_time, backup_type, driver_id, vendor_id, vehicle_no, update_by){
        const query = `
            UPDATE backups
            SET backup_time = $2, backup_type = $3, driver_id = $4, vendor_id = $5, vehicle_no = $6, update_by = $7
            WHERE id = $1
            RETURNING *;
        `;

        try {
            const result = await pool.query(query, [id, backup_time, backup_type, driver_id, vendor_id, vehicle_no, update_by]);
            console.log('Backup updated');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating backup: ${error}`);
        }
    },

    async deleteBackup(id, backup_date, update_by){
        const query = `
            DELETE FROM backups
            WHERE id = $1 AND backup_date = $2
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [id, backup_date]);
            await DailyLogsModel.updateLogStatus(id, backup_date, 'Present', update_by)
            console.log('Backup deleted');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error deleting backup: ${error}`);
        }
    },

    async getAllBackups(){
        const query = `
            SELECT * FROM backups;
        `;

        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting backups: ${error}`);
        }
    },

    async getBackupById(id){
        const query = `
            SELECT * FROM backups
            WHERE id = $1;
        `;

        try {
            const result = await pool.query(query, [id]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting backup: ${error}`);
        }
    },

    async getBackupByIdAndDate(id, backup_date){
        const query = `
            SELECT * FROM backups
            WHERE id = $1 AND backup_date = $2;
        `;

        try {
            const result = await pool.query(query, [id, backup_date]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting backup: ${error}`);
        }
    }
}

export default BackupsModel;