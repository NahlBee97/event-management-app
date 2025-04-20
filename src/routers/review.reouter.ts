import { Router } from "express";
import { GetReviewByEventIdController, GetReviewByUserIdController } from "../controllers/review.controller";

const router = Router();

router.get('/event/:id', GetReviewByEventIdController)

router.get('/user/:id', GetReviewByUserIdController)

export default router;
