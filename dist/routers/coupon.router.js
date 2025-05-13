"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coupon_controller_1 = require("../controllers/coupon.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
//create is in register logic
// read
router.get("/:user_id", auth_middleware_1.VerifyToken, coupon_controller_1.FindCouponByUserIdController);
// update coupon status
router.put("/:user_id", auth_middleware_1.VerifyToken, coupon_controller_1.UpdateCouponStatusController);
exports.default = router;
