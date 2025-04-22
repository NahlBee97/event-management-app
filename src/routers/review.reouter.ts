import { Router } from "express";
import { CreateReviewController, GetReviewByEventIdController, GetReviewByUserIdController, UpdateReviewController } from "../controllers/review.controller";

const router = Router();

router.post('/', CreateReviewController)
router.put('/', UpdateReviewController)
router.get('/event/:id', GetReviewByEventIdController)
router.get('/user/:id', GetReviewByUserIdController)


export default router;
