import mongoose, { Schema } from "mongoose";
import { URLSchema } from "../interfaces/url.interface";

const urlSchema: Schema<URLSchema> = new Schema({
    shortPathId: {
        type: String,
        unique: true,
        required: true
    },
    redirectPath: {
        type: String
    },
    createdBy: {
        type: String,
        required: true
    },
    visitHistory: [
        {
            finalPath: String,
            ip: String,
            date: Number
        }
    ]
}, { timestamps: true });

const UrlModel = (mongoose.models.Url as mongoose.Model<URLSchema>) ?? (mongoose.model<URLSchema>('Url', urlSchema));

export default UrlModel;
