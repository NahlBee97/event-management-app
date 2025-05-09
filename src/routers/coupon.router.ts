import { Router } from "express";
import { FindCouponByUserIdController, UpdateCouponStatusController } from "../controllers/coupon.controller";

const router = Router();

//create is in register logic

// read
router.get("/:user_id", FindCouponByUserIdController);

// update coupon status
router.put("/:user_id", UpdateCouponStatusController)

export default router;
