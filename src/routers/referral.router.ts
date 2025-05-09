import { Router } from "express";
import { FindReferralByUserIdController } from "../controllers/referral.controller";

const router = Router();

// get referral by user id
router.get("/:user_id", FindReferralByUserIdController);
// create referral is in register

export default router;
