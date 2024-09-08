import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import { ErrorWithResponse } from "../helpers/errorWithResponse";
import { sign } from 'jsonwebtoken';

export async function login(req: Request, res: Response, next: NextFunction){
    const { email, password } = req.body;
    
    try {
        const user = await UserModel.findOne({ email });
        if(!user) throw new ErrorWithResponse(400, "Invalid Credentials");
        
        if(!bcrypt.compareSync(password, user.password)) throw new ErrorWithResponse(400, "Invalid Credentials");
        const key = process.env.ACCESS_TOKEN_KEY ?? (()=>{
            console.error("ACCESS_TOKEN_KEY missing in env");
            
            res.status(500).json({
                success: false,
                data: null,
                mesaase: "Server error, please try again later."
            });

            process.exit(1);
        })();
        
        const accessToken = sign({ email, user_id: user._id}, key, {
            expiresIn: "7d"
        });

        return res.status(200).json({
            success: true,
            data: { accessToken },
            message:"Token generated"
        })
    } catch (error) {
        if(error instanceof ErrorWithResponse) return res.status(error.status).json(error.body);

        return res.status(500).json({
            success: false,
            data: null,
            message: "Requested request must contain authorization header with bearer token."
        });
    }
}