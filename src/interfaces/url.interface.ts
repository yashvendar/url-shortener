import mongoose from "mongoose";

interface visitHistory{
    finalPath: string,
    ip: string,
    date: number
}

export interface URLSchema {
    shortPathId: string,
    redirectPath: string,
    createdBy: string,
    visitHistory: visitHistory[]
}