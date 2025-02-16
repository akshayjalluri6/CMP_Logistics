import pool from "../db.js";
import DailyLogsModel from "./DailyLogsModel.js";

const RidesModel = {
    async createRidesTable() {
        const query = `CREATE TABLE IF NOT EXISTS rides(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            client_name VARCHAR(50) NOT NULL,
            duration NUMERIC NOT NULL,
            remaining_days NUMERIC NOT NULL,
            start_date DATE,
            created_by UUID NOT NULL,
            update_by UUID NOT NULL,
            FOREIGN KEY (created_by) REFERENCES users(id),
            FOREIGN KEY (update_by) REFERENCES users(id)
        );
        `;

        try {
            await pool.query(query);
            console.log('Rides table created');
        } catch (error) {
            console.log(`Error creating rides table: ${error}`);
        }
    },

    async addRide(client_name, duration, created_by) {
        const query = `
            INSERT INTO rides(client_name, duration, remaining_days, created_by, update_by)
            VALUES($1, $2, $2, $3, $3)
            RETURNING *;
        `
        try {
            const result = await pool.query(query, [client_name, duration, created_by]);
            console.log('Ride added');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error adding ride: ${error}`);
        }
    },

    async updateRide(id, client_name, duration, update_by){
        const query = `
          SELECT duration, remaining_days FROM rides WHERE id = $1;
        `;

        const result = await pool.query(query, [id]);

        const old_duration = result.rows[0].duration;
        const old_remaining_days = result.rows[0].remaining_days;

        if(duration > old_duration){
            const new_remaining_days = old_remaining_days + (duration - old_duration);
            const query = `
              UPDATE rides
              SET client_name = $2, duration = $3, remaining_days = $4, update_by = $5
              WHERE id = $1
              RETURNING *;
            `;

            const result = await pool.query(query, [id, client_name, duration, new_remaining_days, update_by]);
            console.log('Ride updated');
            return result.rows[0];
        } else {
            const new_remaining_days = old_remaining_days - (old_duration - duration);
            const query = `
              UPDATE rides
              SET client_name = $2, duration = $3, remaining_days = $4, update_by = $5
              WHERE id = $1
              RETURNING *;
            `;

            const result = await pool.query(query, [id, client_name, duration, new_remaining_days, update_by]);
            console.log('Ride updated');
            return result.rows[0];
        }
    },

    async startRide(id, start_date, update_by) {
        const current_date = new Date();
        const startDateObj = new Date(start_date); // Convert input to Date object
    
        console.log(`Current Date: ${current_date.toISOString().split('T')[0]}`);
        console.log(`Start Date: ${startDateObj.toISOString().split('T')[0]}`);
    
        if (startDateObj < current_date) {
            throw new Error('Start date cannot be in the past');
        }
    
        const query = `
            UPDATE rides
            SET start_date = $2, update_by = $3
            WHERE id = $1
            RETURNING *;
        `;
    
        try {
            const result_ride = await pool.query(`SELECT * FROM daily_logs WHERE id = $1`, [id]);
            if (result_ride.rows.length > 0) {
                await DailyLogsModel.deleteInitialLog(id);
            }
            const result = await pool.query(query, [id, start_date, update_by]);
            console.log('Ride started');
            await DailyLogsModel.addInitialLog(id, start_date, update_by);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error starting ride: ${error}`);
        }
    } ,
    
    async getActiveRides() {
        const query = `
            SELECT * FROM rides
            WHERE remaining_days > 0 AND start_date IS NOT NULL;
        `;

        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(`Error getting active rides: ${error}`);
        }
    },

    async updateRemainingDays(id, remaining_days) {
        const query = `
            UPDATE rides
            SET remaining_days = $2
            WHERE id = $1
            RETURNING *;
        `;

        try {
            const result = await pool.query(query, [id, remaining_days]);
            console.log('Remaining days updated');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating remaining days: ${error}`);
        }
    }
}

export default RidesModel;