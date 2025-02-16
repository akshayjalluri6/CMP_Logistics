import cron from 'node-cron'
import RidesModel from '../db/models/RidesModel.js';
import DailyLogsModel from '../db/models/DailyLogsModel.js';
import VehiclesModel from '../db/models/VehiclesModel.js';
import DriversModel from '../db/models/DriversModel.js';

const startDailyJobLog = () => {
    cron.schedule('0 6 * * *', async () => {
        console.log('Starting daily job log...');
        try {
            await VehiclesModel.resetVehiclesStatus();
            await DriversModel.resetDriversStatus();
            const activeRides = await RidesModel.getActiveRides();

            if(activeRides.length === 0){
                return console.log('No active rides');
            }
            for(const ride of activeRides){
                const lastlog = await DailyLogsModel.getLastLog(ride.id);
                
                const {id, client_name, vehicle_no, driver_id, vendor_id, created_by} = lastlog

                const date = new Date().toISOString().split('T')[0];
                const log_status = 'present';

                await DailyLogsModel.addAutoLog(id, date, client_name, vehicle_no, driver_id, vendor_id, log_status, created_by);
                
                const remaining_days = ride.remaining_days - 1;
                await RidesModel.updateRemainingDays(ride.id, remaining_days);
            }
        } catch (error) {
            console.log(`Error starting daily job log: ${error}`);
            throw error;
        }
    });
}