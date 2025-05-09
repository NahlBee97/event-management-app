"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const router = (0, express_1.Router)();
//read
router.get('/event/:id', review_controller_1.GetReviewByEventIdController);
router.get('/user/:id', review_controller_1.GetReviewByUserIdController);
//create
router.post('/', review_controller_1.CreateReviewController);
//update
router.put('/', review_controller_1.UpdateReviewController);
//delete
router.delete('/:id', review_controller_1.DeleteReviewController);
exports.default = router;
