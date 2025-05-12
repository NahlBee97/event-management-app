import { Router } from "express";
import { FindReferralByUserIdController } from "../controllers/referral.controller";
import { VerifyToken } from "../middlewares/auth.middleware";

const router = Router();

// get referral by user id
router.get("/:user_id", VerifyToken, FindReferralByUserIdController);
// create referral is in register

export default router;
