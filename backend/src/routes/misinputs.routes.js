import { Router } from "express";
import authToken from "../middlewares/auth.middleware.js";
import MisInputsDataModel from "../db/models/MisInputsDataModel.js";

const misInputsRouter = Router();

misInputsRouter.get('/mis-inputs', authToken, async(req, res) => {
    const {date} = req.query;
    let result;

    try {
        if(date){
            result = await MisInputsDataModel.getMisInputsDataByDate(date);
        }
        else{
            result = await MisInputsDataModel.getMisInputsData();
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

misInputsRouter.get('/mis-inputs/:id/:date', authToken, async(req, res) => {
    const {id, date} = req.params;
    try {
        const result = await MisInputsDataModel.getMisInputsDataByIdAndDate(id, date);
        res.status(200).json({result});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

misInputsRouter.put('/update-mis-inputs/:id/:date', authToken, async(req, res) => {
    const {id, date} = req.params;
    const {vehicle_no, client_name, client_vehicle_type, client_kms, client_working_hours, client_working_type, lane, tour_id, running_kms_rates, running_hours_rate, fuel_subcharge, client_tolls, vendor_tolls, total, remarks} = req.body;

    try {
        const result = await MisInputsDataModel.updateMisInputsData(id, date, vehicle_no, client_name, client_vehicle_type, client_kms, client_working_hours, client_working_type, lane, tour_id, running_kms_rates, running_hours_rate, fuel_subcharge, client_tolls, vendor_tolls, total, remarks, req.user_id);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default misInputsRouter