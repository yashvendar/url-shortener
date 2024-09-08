import { NextFunction, Request, Response} from "express";
import UrlModel from "../models/url.model";
import { URLSchema } from "../interfaces/url.interface";
import crypto from "crypto";

export async function getRedirectPath(req: Request, res: Response, next: NextFunction){
    try {
        let urlRecord = await UrlModel.findOne({
            shortPathId: req.params.short_id
        });
        
        if(!urlRecord) return res.status(404).json({
            success: false,
            message: "URL expired or didn't exists",
            data: null
        })
        
        let finalUrl = urlRecord.redirectPath + req.originalUrl.split(req.params.short_id)[1];
        
        urlRecord.visitHistory.push({
            finalPath: finalUrl,
            date: Date.now(),
            ip: req.ip??""
        });
        await urlRecord.save();
        
        return res.redirect(finalUrl);
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error"
        });
    }
    
}

export async function createShortPath(req: Request, res: Response, next: NextFunction){

    try {
        let urlRecord: URLSchema = {
            createdBy: req.decodedToken?.user_id,
            redirectPath: req.body.urlPath,
            shortPathId: crypto.randomBytes(10).toString("hex"),
            visitHistory: []
        }
        let response = await UrlModel.create(urlRecord);
        return res.status(201).json({
            success: true,
            message: "Shortner url created!",
            data: response
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
export async function getAllShortPath(req: Request, res: Response, next: NextFunction){
    const filters:any = { };
    
    if(!req.user?.isAdmin){ filters.createdBy = req.decodedToken?.user_id; };
    
    const response = await UrlModel.find(filters);
    
    return res.status(200).json({
        data:response,
        success: true,
        message: ""
    });
}

export async function deleteShortPath(req: Request, res: Response, next: NextFunction){
    
    const filters:any = { shortPathId: req.params.shortPathId };

    if(!req.user?.isAdmin) filters.createdBy = req.decodedToken?.user_id;

    const deletedRecords = await  UrlModel.findOneAndDelete(filters);

    if(!deletedRecords){
        return res.status(404).json({
            message: "Requested short path id doesn't exists",
            data: null,
            success: false
        })
    }
    return res.status(200).json({
        success: true,
        message: "Deleted successfully",
        data: deletedRecords
    })
}