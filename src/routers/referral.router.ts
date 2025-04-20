import { Router } from "express";
import { FindReferralByUserIdController } from "../controllers/referral.controller";

const router = Router();

// get point by user id
router.get("/referral/:id", FindReferralByUserIdController);

export default router;
