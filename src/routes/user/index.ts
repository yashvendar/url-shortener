import { Router } from "express";
import validateBody from "../../middlewares/bodyValidator.middleware";
import userSchema from "../../schemas/user.schema";
import { createUser, deleteUser } from "../../controllers/user.controller";
import { authenticateRequest } from "../../middlewares/authentication.middleware";

const userRouter = Router();

userRouter.post("/", validateBody(userSchema), createUser);

userRouter.delete("/:user_id", authenticateRequest, deleteUser)

export default userRouter;