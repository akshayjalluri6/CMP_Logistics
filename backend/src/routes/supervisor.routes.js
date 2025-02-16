import { Router } from "express";
import VendorModel from "../db/models/VendorsModel.js";
import VehiclesModel from "../db/models/VehiclesModel.js";
import authToken from "../middlewares/auth.middleware.js";
import DriversModel from "../db/models/DriversModel.js";
import RidesModel from "../db/models/RidesModel.js";
import DailyLogsModel from "../db/models/DailyLogsModel.js";
import BackupsModel from "../db/models/BackupsModel.js";
import AdHocsModel from "../db/models/AdHocsModel.js";

const supervisorRouter = Router();

supervisorRouter.post('/add-vendor', authToken, async(req, res) => {
    const {name, account_no, account_holder_name, ifsc_code, bank_name, branch_name, phone_no, email, address} = req.body;

    try {
        const result = await VendorModel.addVendor(name, account_no, account_holder_name, ifsc_code, bank_name, branch_name, phone_no, email, address, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.post('/add-vehicle', authToken, async(req, res) => {
    const {vehicle_no, type, model, mileage, owner, status} = req.body;

    try {
        const result = await VehiclesModel.addVehicle(vehicle_no, type, model, mileage, owner, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.put('/update-vehicle/:id', authToken, async(req, res) => {
    const {vehicle_no, type, model, mileage, owner, status} = req.body;

    try {
        const result = await VehiclesModel.updateVehicle(vehicle_no, type, model, mileage, owner, req.user_id, status);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.post('/add-driver', authToken, async(req, res) => {
    const {license_no, name, phone_no, address, status} = req.body;

    try {
        const result = await DriversModel.addDriver(license_no, name, phone_no, address, status, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.post('/update-driver/:id', authToken, async(req, res) => {
    const {license_no, name, phone_no, address, status} = req.body;

    try {
        const result = await DriversModel.updateDriver(license_no, name, phone_no, address, req.user_id, status);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.post('/add-ride', authToken, async(req, res) => {
    const {client_name, duration} = req.body;

    try{
        const result = await RidesModel.addRide(client_name, duration, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.put('/update-ride/:id', authToken, async(req, res) => {
    const {client_name, duration} = req.body;
    const {id} = req.params;

    try {
        const result = await RidesModel.updateRide(id, client_name, duration, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.put('/start-ride/:id', authToken, async(req, res) => {
    const {id} = req.params;
    const {start_date} = req.body;

    try {
        const result = await RidesModel.startRide(id,start_date, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.get('/daily-logs', authToken, async(req, res) => {
    const {date} = req.body;

    try {
        const result = await DailyLogsModel.todayLogs(date);
        res.status(200).json({result});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

supervisorRouter.put('/update-log/:id', authToken, async(req, res) => {
    const {id} = req.params;
    const {start_time, client_name, vehicle_no, driver_id, vendor_id, log_status, ride_type} = req.body;

    try {
        const result = await DailyLogsModel.updateLog(id, start_time, client_name, vehicle_no, driver_id, vendor_id, log_status, ride_type, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.put('/update-log-status', authToken, async(req, res) => {
    const {id, date, log_status} = req.body;

    try {
        const result = await DailyLogsModel.updateLogStatus(id, date, log_status, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.put('/update-log-data/:id/:date', authToken, async(req, res) => {
    const {id, date} = req.params;
    const {client_name, vendor_name, vehicle_no, vehicle_type, working_hours, working_type, running_kms, lane, tour_id, remarks} = req.body;

    try {
        const result = await DailyLogsModel.updateLogData(id, date, client_name, vendor_name, vehicle_no, vehicle_type, working_hours, working_type, running_kms, lane, tour_id, remarks, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Backups
supervisorRouter.get('/backups', authToken, async(req, res) => {
    try {
        const result = await BackupsModel.getAllBackups();
        res.status(200).json({result});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

supervisorRouter.get('/backups/:id', authToken, async(req, res) => {
    const {id} = req.params;

    try {
        const result = await BackupsModel.getBackupById(id);
        res.status(200).json({result});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

supervisorRouter.get('/backups/:id/:date', authToken, async(req, res) => {
    const {id, date} = req.params;

    try {
        const result = await BackupsModel.getBackupByIdAndDate(id, date);
        res.status(200).json({result});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

supervisorRouter.post('/add-backup', authToken, async(req, res) => {
    const {id, backup_date, backup_type} = req.body;

    try {
        const result = await BackupsModel.addInitialBackup(id, backup_date, backup_type, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.put('/update-backup/:id/:date', authToken, async(req, res) => {
    const {id, date} = req.params;
    const {backup_time, backup_type, driver_id, vendor_id, vehicle_no} = req.body;
    
    try {
        const result = await BackupsModel.updateBackup(id, date, backup_time, backup_type, driver_id, vendor_id, vehicle_no, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.delete('/delete-backup/:id/:date', authToken, async(req, res) => {
    const {id, date} = req.params;

    try {
        const result = await BackupsModel.deleteBackup(id, date, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Supervisor Data
supervisorRouter.get('/supervisor-data', authToken, async(req, res) => {
    const {date} = req.query;
    let result;
    try {
        if(date){
            result = await SuperviorDataModel.getLogDataByDate(date);
        }
        else{
            result = await SuperviorDataModel.getLogsData();
        }
        res.status(200).json({result});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

supervisorRouter.get('/supervisor-data/:id/:date', authToken, async(req, res) => {
    const {id, date} = req.params;

    try {
        const result = await SuperviorDataModel.getLogDataByIdAndDate(id, date);
        res.status(200).json({result});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

supervisorRouter.put('/update-supervisor-data/:id/:date', authToken, async(req, res) => {
    const {id, date} = req.params;
    const {client_name, vendor_name, vehicle_no, vehicle_type, working_hours, working_type, running_kms, lane, tour_id, remarks} = req.body;
    
    try {
        const result = await SuperviorDataModel.updateLogData(id, date, client_name, vendor_name, vehicle_no, vehicle_type, working_hours, working_type, running_kms, lane, tour_id, remarks, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//AdHoc
supervisorRouter.get('/adhoc', authToken, async(req, res) => {
    const {date} = req.query;
    let result;
    try {
        if(date){
            result = await AdHocsModel.getRidesByDate(date);
        }
        else{
            result = await AdHocsModel.getRides();
        }
        res.status(200).json({result});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

supervisorRouter.get('/adhoc/:id', authToken, async(req, res) => {
    const {id} = req.params;

    try {
        const result = await AdHocsModel.getRideById(id);
        res.status(200).json({result});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

supervisorRouter.post('/add-adhoc', authToken, async(req, res) => {
    const {client_name, initial_kms, vehicle_no, vehicle_type, driver_name, vendor_id, start_date} = req.body;

    try {
        const result = await AdHocsModel.addRide(client_name, initial_kms, vehicle_no, vehicle_type, driver_name, vendor_id, start_date, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.put('/update-adhoc/:id', authToken, async(req, res) => {
    const {id} = req.params;
    const {client_name, initial_kms, vehicle_no, vehicle_type, driver_name, vendor_id, start_date} = req.body;
    
    try {
        const result = await AdHocsModel.updateRide(id, client_name, initial_kms, vehicle_no, vehicle_type, driver_name, vendor_id, start_date, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

supervisorRouter.delete('/delete-adhoc/:id', authToken, async(req, res) => {
    const {id} = req.params;

    try {
        const result = await AdHocsModel.deleteRide(id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default supervisorRouter;
