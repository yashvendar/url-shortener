import { Router } from "express";
import { createShortPath, deleteShortPath, getAllShortPath, getRedirectPath } from "../../controllers/url.controller";
import validateBody from "../../middlewares/bodyValidator.middleware";
import urlSchema from "../../schemas/url.schema";
import { authenticateRequest } from "../../middlewares/authentication.middleware";

const urlRouter = Router({
    strict: false
});

urlRouter.post("/url", authenticateRequest, validateBody(urlSchema), createShortPath);
urlRouter.delete("/url/:shortPathId", authenticateRequest, deleteShortPath);
urlRouter.get("/url", authenticateRequest, getAllShortPath);
urlRouter.get("/:short_id*", getRedirectPath);

export default urlRouter;