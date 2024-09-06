import express, { Application } from "express";
import helmet from "helmet";
import { config as configENV } from "dotenv";

export default function configApp(app: Application){
    configENV();
    app.use(helmet());
    app.use(express.json());
}