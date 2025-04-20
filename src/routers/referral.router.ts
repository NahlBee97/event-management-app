import { Router } from "express";
import { FindReferralByUserIdController } from "../controllers/referral.controller";

const router = Router();

// get point by user id
router.get("/referral/:user_id", FindReferralByUserIdController);

export default router;
