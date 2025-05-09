import { Router } from "express";
import { CreateReviewController, DeleteReviewController, GetReviewByEventIdController, GetReviewByUserIdController, UpdateReviewController } from "../controllers/review.controller";

const router = Router();

//read
router.get('/event/:id', GetReviewByEventIdController)
router.get('/user/:id', GetReviewByUserIdController)
//create
router.post('/', CreateReviewController)
//update
router.put('/', UpdateReviewController)
//delete
router.delete('/:id', DeleteReviewController)


export default router;
