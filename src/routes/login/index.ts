import { Router } from "express";
import { login } from "../../controllers/login.controller";
import validateBody from "../../middlewares/bodyValidator.middleware";
import loginSchema from "../../schemas/login.schema";

const loginRouter = Router();

loginRouter.post("/", validateBody(loginSchema), login);

export default loginRouter;