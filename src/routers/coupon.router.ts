import { Router } from "express";
import { FindCouponByUserIdController, UpdateCouponStatusController } from "../controllers/coupon.controller";
import { VerifyToken } from "../middlewares/auth.middleware";

const router = Router();

//create is in register logic

// read
router.get("/:user_id", VerifyToken,FindCouponByUserIdController);

// update coupon status
router.put("/:user_id", VerifyToken, UpdateCouponStatusController)

export default router;
