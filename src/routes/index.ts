import { Router } from "express";
import userRouter from "./user";
import urlRouter from "./url";
import loginRouter from "./login";

const routes = Router();

routes.use('/user', userRouter);

routes.use("/login", loginRouter);

routes.use("",urlRouter);

export default routes;