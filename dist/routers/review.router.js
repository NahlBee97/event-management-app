"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const review_schema_1 = require("../schemas/review.schema");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const router = (0, express_1.Router)();
//read
router.get('/event/:id', review_controller_1.GetReviewByEventIdController);
router.get('/user/:id', review_controller_1.GetReviewByUserIdController);
//create
router.post('/', (0, validator_middleware_1.ReqValidator)(review_schema_1.reviewSchema), auth_middleware_1.VerifyToken, review_controller_1.CreateReviewController);
//update
router.put('/', (0, validator_middleware_1.ReqValidator)(review_schema_1.reviewSchema), auth_middleware_1.VerifyToken, review_controller_1.UpdateReviewController);
//delete
router.delete('/:id', auth_middleware_1.VerifyToken, review_controller_1.DeleteReviewController);
exports.default = router;
