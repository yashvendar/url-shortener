import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export default function validateBody(schema: AnyZodObject){
    return (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        const result = schema.safeParse(body);

        if(result.success) return next();
        
        return res.status(400).json({
            success: false,
            data:result.error.issues.map((issue)=>issue.message),
            message: "Bad request"
        })
    }
}