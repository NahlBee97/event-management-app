"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReviewByEventIdController = GetReviewByEventIdController;
exports.GetReviewByUserIdController = GetReviewByUserIdController;
exports.CreateReviewController = CreateReviewController;
exports.UpdateReviewController = UpdateReviewController;
exports.DeleteReviewController = DeleteReviewController;
const review_service_1 = require("../services/review.service");
function GetReviewByEventIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const eventId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
            const review = yield (0, review_service_1.GetReviewByEventIdSevice)(eventId);
            res.status(200).send({
                success: true,
                message: `Get review with id ${eventId} is success`,
                data: review
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetReviewByUserIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const eventId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
            const review = yield (0, review_service_1.GetReviewByUserIdservice)(eventId);
            res.status(200).send({
                success: true,
                message: `Get review with user id ${eventId} is success`,
                data: review
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function CreateReviewController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, review_service_1.CreateReviewService)(req.body);
            res.status(200).send({
                success: true,
                message: `Your review have been adding`,
                data
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function UpdateReviewController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, review_service_1.UpdateReviewService)(req.body);
            res.status(200).send({
                success: true,
                message: `Your review already updated`,
                data
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function DeleteReviewController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            yield (0, review_service_1.DeleteReviewService)(id);
            res.status(200).send({
                success: true,
                message: `Delete your review success`,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
