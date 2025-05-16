"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const referral_controller_1 = require("../controllers/referral.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// get referral by user id
router.get("/:user_id", auth_middleware_1.VerifyToken, referral_controller_1.FindReferralByUserIdController);
// create referral is in register
exports.default = router;
