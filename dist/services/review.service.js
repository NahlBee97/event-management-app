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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReviewByEventIdSevice = GetReviewByEventIdSevice;
exports.GetReviewByUserIdservice = GetReviewByUserIdservice;
exports.CreateReviewService = CreateReviewService;
exports.UpdateReviewService = UpdateReviewService;
exports.DeleteReviewService = DeleteReviewService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function FindUserReview(user_id, event_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingReview = yield prisma_1.default.review.findUnique({
                where: {
                    user_id_event_id: {
                        user_id,
                        event_id,
                    },
                },
            });
            return existingReview;
        }
        catch (error) {
            throw error;
        }
    });
}
function GetReviewByEventIdSevice(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const review = yield prisma_1.default.review.findMany({
                where: {
                    event_id: Number(params)
                },
                include: {
                    users: {
                        select: {
                            first_name: true,
                            last_name: true,
                            profile_picture: true
                        },
                    },
                },
            });
            if (!review)
                throw new Error(`Review with this id ${params} not found`);
            return review;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetReviewByUserIdservice(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const review = yield prisma_1.default.review.findFirst({
                where: {
                    user_id: Number(params)
                }
            });
            if (!review)
                throw new Error(`Review user with this id ${params} not found`);
            return review;
        }
        catch (err) {
            throw err;
        }
    });
}
function CreateReviewService(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isExistReview = yield FindUserReview(params.user_id, params.event_id);
            if (isExistReview)
                throw new Error("Your review already exist, you had reviewed this event!");
            const newReview = yield prisma_1.default.review.create({
                data: {
                    user_id: params === null || params === void 0 ? void 0 : params.user_id,
                    event_id: params === null || params === void 0 ? void 0 : params.event_id,
                    message: params === null || params === void 0 ? void 0 : params.message,
                    rating: params === null || params === void 0 ? void 0 : params.rating,
                },
            });
            return newReview;
        }
        catch (error) {
            throw error;
        }
    });
}
function UpdateReviewService(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id, event_id, message, rating } = params;
            const isExistReview = yield FindUserReview(user_id, event_id);
            if (!isExistReview)
                throw new Error("Review not found");
            const updateReview = yield prisma_1.default.review.update({
                where: {
                    user_id_event_id: {
                        user_id,
                        event_id,
                    },
                },
                data: {
                    message,
                    rating
                },
            });
            return updateReview;
        }
        catch (error) {
            throw error;
        }
    });
}
function DeleteReviewService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma_1.default.review.delete({
                where: {
                    id
                }
            });
        }
        catch (error) {
            throw error;
        }
    });
}
