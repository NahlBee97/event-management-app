import { Router } from "express";
import { FindPointByUserIdController } from "../controllers/point.controller";
import { VerifyToken } from "../middlewares/auth.middleware";

const router = Router();

// get point by user id
router.get("/:user_id", VerifyToken, FindPointByUserIdController);
// update point on register done
// update point after transaction?

export default router;
