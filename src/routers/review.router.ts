import { Router } from "express";
import { CreateReviewController, DeleteReviewController, GetReviewByEventIdController, GetReviewByUserIdController, UpdateReviewController } from "../controllers/review.controller";
import { VerifyToken } from "../middlewares/auth.middleware";

const router = Router();

//read
router.get('/event/:id', GetReviewByEventIdController)
router.get('/user/:id', GetReviewByUserIdController)
//create
router.post('/', VerifyToken, CreateReviewController)
//update
router.put('/', VerifyToken, UpdateReviewController)
//delete
router.delete('/:id', VerifyToken, DeleteReviewController)


export default router;
