import { Router } from "express";
import { FindCouponByUserIdController } from "../controllers/coupon.controller";

const router = Router();

// get coupon by user id
router.get("/:user_id", FindCouponByUserIdController);

export default router;
