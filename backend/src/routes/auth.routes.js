import { Router } from "express";
import UserModel from "../db/models/UsersModel.js";

const authRouter = Router();

authRouter.post('/login', async(req, res) => {
    const {email, password} = req.body;

    try {
        console.log(email, password);
        const jwtToken = await UserModel.userLogin(email, password);
        res.status(200).json({token: jwtToken});
    } catch (error) {
        res.status(500).json({message: error});
    }
})

authRouter.post('/signup', async(req, res) => {
    const {first_name, middle_name, last_name, email, password, phone_no, role, address} = req.body;

    try {
        const result = await UserModel.addUser(first_name, middle_name, last_name, email, password, phone_no, role, address);
        res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default authRouter;