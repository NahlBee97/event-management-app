"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const referral_controller_1 = require("../controllers/referral.controller");
const router = (0, express_1.Router)();
// get referral by user id
router.get("/:user_id", referral_controller_1.FindReferralByUserIdController);
// create referral is in register
exports.default = router;
