import { Router } from "express";
import { CreateReviewController, DeleteReviewController, GetReviewByEventIdController, GetReviewByUserIdController, UpdateReviewController } from "../controllers/review.controller";
import { VerifyToken } from "../middlewares/auth.middleware";
import { reviewSchema } from "../schemas/review.schema";
import { ReqValidator } from "../middlewares/validator.middleware";

const router = Router();

//read
router.get('/event/:id', GetReviewByEventIdController)
router.get('/user/:id', GetReviewByUserIdController)
//create
router.post('/', ReqValidator(reviewSchema), VerifyToken, CreateReviewController)
//update
router.put('/', ReqValidator(reviewSchema), VerifyToken, UpdateReviewController)
//delete
router.delete('/:id', VerifyToken, DeleteReviewController)


export default router;
