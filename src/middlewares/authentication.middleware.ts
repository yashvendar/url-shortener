import { Request, Response, NextFunction } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";
import UserModel from "../models/user.model";

export async function authenticateRequest(req: Request, res: Response, next: NextFunction){
    const bearerToken = req.headers.authorization;
    if(bearerToken && bearerToken.startsWith("Bearer ")){
        const token = bearerToken.split(" ")[1];
        try {
            const key = process.env.ACCESS_TOKEN_KEY ?? (()=>{
                
                console.error("ACCESS_TOKEN_KEY missing in env");

                res.status(500).json({
                    success: false,
                    data: null,
                    mesaase: "Server error, please try again later."
                });

                process.exit(1);
            })();

            const decodedToken = await verify(token, key);

            if(typeof decodedToken != "string"){
                req.decodedToken = decodedToken;
                const { email } = req.decodedToken;
                
                let user = await UserModel.findOne({email});
                if(!user){
                    return res.status(401).json({
                        message: "Token expired",
                        data: null,
                        success: false
                    })
                }
                req.user = user;
                return next();
            }            
        } catch (error) {
            if(error instanceof TokenExpiredError){
                return res.status(401).json({
                    success: false,
                    message: "Token expired",
                    data: null
                })
            }
            return res.status(400).json({
                success: false,
                message: "Invalid Token",
                data: null
            })
        }
    }
    else{
        return res.status(401).json({
            success: false,
            data: null,
            message: "Requested request must contain authorization header with bearer token."
        })
    }
}