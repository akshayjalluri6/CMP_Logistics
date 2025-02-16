import express from 'express';
import cors from 'cors';
import {configDotenv} from 'dotenv'
import RidesModel from './db/models/RidesModel.js';
import UserModel from './db/models/UsersModel.js';
import VendorModel from './db/models/VendorsModel.js';
import VehiclesModel from './db/models/VehiclesModel.js';
import SuperviorDataModel from './db/models/SuperviorDataModel.js';
import MisInputsDataModel from './db/models/MisInputsDataModel.js';
import DriversModel from './db/models/DriversModel.js';
import DailyLogsModel from './db/models/DailyLogsModel.js';
import BackupsModel from './db/models/BackupsModel.js';
import AdHocsModel from './db/models/AdHocsModel.js';
import authRouter from './routes/auth.routes.js';
import supervisorRouter from './routes/supervisor.routes.js';
import misInputsRouter from './routes/misinputs.routes.js';
import ManagerModel from './db/models/ManagerModel.js';
import managerRouter from './routes/manager.routes.js';

configDotenv();

const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/supervisor', supervisorRouter);
app.use('/api/v1/mis', misInputsRouter);
app.use('/api/v1/manager', managerRouter);
app.use(cors());

const port = process.env.PORT || 8081;

const initializeDBandServer = async() => {
    try {
        app.listen(port, async() => {
            await RidesModel.createRidesTable();
            await UserModel.createUsersTable();
            await VendorModel.createVendorsTable();
            await VehiclesModel.createVehiclesTable();
            await DriversModel.createDriversTable();
            await DailyLogsModel.createDailyLogsTable();
            await SuperviorDataModel.createSupervisorDataTable();
            await MisInputsDataModel.createMisInputsDataTable();
            await ManagerModel.createManagerDataTable();
            await BackupsModel.createBackupsTable();
            await AdHocsModel.createAdhocsTable();
            console.log(`Server is running on http://localhost:${port}`);
        } )
    } catch (error) {
        console.log(error);
    }
}

initializeDBandServer();