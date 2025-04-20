import { Router } from "express";
import { GetReviewByEventIdController } from "../controllers/review.controller";

const router = Router();

router.get('/event/:id', GetReviewByEventIdController)

export default router;
