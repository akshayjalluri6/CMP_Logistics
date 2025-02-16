import pool from "../db.js";

const VehiclesModel = {
    async createVehiclesTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS vehicles(
                vehicle_no VARCHAR(50) PRIMARY KEY,
                type VARCHAR(50) NOT NULL,
                model VARCHAR(50) NOT NULL,
                mileage NUMERIC NOT NULL,
                owner UUID NOT NULL,
                status VARCHAR(50) NOT NULL DEFAULT 'available',
                created_by UUID NOT NULL,
                update_by UUID NOT NULL,
                FOREIGN KEY (owner) REFERENCES vendors(id),
                FOREIGN KEY (created_by) REFERENCES users(id),
                FOREIGN KEY (update_by) REFERENCES users(id)
            );
        `;

        try {
            await pool.query(query);
            console.log('Vehicles table created');
        } catch (error) {
            console.log(`Error creating vehicles table: ${error}`);
        }
    },

    async addVehicle(vehicle_no, type, model, mileage, owner, created_by) {
        const query = `
            INSERT INTO vehicles(vehicle_no, type, model, mileage, owner, created_by, update_by)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;

        try {
            const result = await pool.query(query, [vehicle_no, type, model, mileage, owner, created_by, created_by]);
            return result.rows[0];
        } catch (error) {
            console.log(`Error adding vehicle: ${error}`);
        }
    },

    async updateVehicle(vehicle_no, type, model, mileage, owner, update_by, status) {
        const query = `
            UPDATE vehicles
            SET type = $2, model = $3, mileage = $4, owner = $5, status = $6, update_by = $7
            WHERE vehicle_no = $1
            RETURNING *;
        `;

        try {
            const result = await pool.query(query, [vehicle_no, type, model, mileage, owner, status, update_by]);
            return result.rows[0];
        } catch (error) {
            console.log(`Error updating vehicle: ${error}`);
        }
    },

    async getVehicleDetails(vehicle_no){
        const query = `
            SELECT * FROM vehicles
            WHERE vehicle_no = $1;
        `;
        try {
            const result = await pool.query(query, [vehicle_no]);
            return result.rows[0];
        } catch (error) {
            console.log(`Error getting vehicle details: ${error}`);
        }
    },

    async getVehicles() {
        const query = `
            SELECT * FROM vehicles;
        `;
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.log(`Error getting vehicles: ${error}`);
        }
    },

    async deleteVehicle(vehicle_no){
        const query = `
            DELETE FROM vehicles
            WHERE vehicle_no = $1;
        `;
        try {
            const result = await pool.query(query, [vehicle_no]);
            return result.rows[0];
        } catch (error) {
            console.log(`Error deleting vehicle: ${error}`);
        }
    },

    async updateVehicleStatus(vehicle_no, status, update_by){
        const query = `
            UPDATE vehicles
            SET status = $2, update_by = $3
            WHERE vehicle_no = $1
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [vehicle_no, status, update_by]);
            return result.rows[0];
        } catch (error) {
            console.log(`Error updating vehicle status: ${error}`);
        }
    },

    async resetVehiclesStatus(){
        const query = `
            UPDATE vehicles
            SET status = 'available'
            WHERE status = 'on-duty'
            RETURNING *;
        `;
        try {
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            console.log(`Error resetting vehicles status: ${error}`);
        }
    }
}

export default VehiclesModel;