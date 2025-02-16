import { Router } from "express";
import authToken from "../middlewares/auth.middleware.js";
import ManagerModel from "../db/models/ManagerModel.js";

const managerRouter = Router();

managerRouter.get('/rides',authToken, async(req, res) => {
    const {date} = req.query;
    let result;

    try {
        if(date){
            result = await ManagerModel.getLogDataByDate(date);
        }
        else{
            result = await ManagerModel.getLogsData();
        }
        res.status(200).json({result});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

managerRouter.get('/rides/:id/:date', authToken, async(req, res) => {
    const {id, date} = req.params;
    try {
        const result = await ManagerModel.getLogDataByIdAndDate(id, date);
        res.status(200).json({result});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

managerRouter.put('/update-ride/:id/:date', authToken, async(req, res) => {
    const {id, date} = req.params;
    const {vendor_name, vehicle_no, kms_difference, matching_data_difference, running_hours_rate_difference, working_hours_rate_difference, total_vendor_pay, total_client_pay, remarks} = req.body;

    try {
        const result = await ManagerModel.updateLogData(id, date, vendor_name, vehicle_no, kms_difference, matching_data_difference, running_hours_rate_difference, working_hours_rate_difference, total_vendor_pay, total_client_pay, remarks, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default managerRouter