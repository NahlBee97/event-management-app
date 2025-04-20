import { Router } from "express";
import { FindCouponByUserIdController } from "../controllers/coupon.controller";

const router = Router();

// get coupon by user id
router.get("/coupons/:id", FindCouponByUserIdController);

export default router;
