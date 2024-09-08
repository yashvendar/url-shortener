import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response, next: NextFunction){
    try {
        const { email, password: pass, name, username } = req.body;

        const existingUser = await UserModel.findOne({
            email: email
        });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists with same email id.",
                data: null
            })
        }
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(pass, salt);

        const userDetails = await  UserModel.create({
            email,
            password,
            username: username ?? email,
            name,
            isAdmin: false
        });

        userDetails.set("password", undefined);
        
        return res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: userDetails
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error"
        });
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction){
    try {
        if(!req.user?.isAdmin && req.params.user_id != req.decodedToken?.user_id){
            return res.status(403).json({
                success: false,
                data: null,
                message: "You don't have enough access for this api"
            })
        }

        const userId = req.params.user_id;
        const user = await  UserModel.findOneAndDelete({
            _id: userId
        });
        if(user){
            user.set("password", undefined);
            return res.status(200).json({
                success: true,
                data: user,
                message: "User deleted successfully!"
            })
        }
        else{
            return res.status(400).json({
                success: false,
                data: null,
                message: "User doesn't exists."
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error"
        });
    }
}