import { Router } from "express";
import { FindPointByUserIdController } from "../controllers/point.controller";
import { VerifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/:user_id", VerifyToken, FindPointByUserIdController);
// update point after transaction?

export default router;
