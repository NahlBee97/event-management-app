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
exports.FindCouponByUserIdService = FindCouponByUserIdService;
exports.UpdateCouponStatusService = UpdateCouponStatusService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function FindCouponByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const coupon = yield prisma_1.default.coupons.findFirst({
                where: {
                    user_id: userId,
                },
            });
            if (!coupon)
                throw new Error("You don't have any coupon");
            return coupon;
        }
        catch (err) {
            throw err;
        }
    });
}
function UpdateCouponStatus(userId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const coupon = yield FindCouponByUserId(userId);
            if (!coupon)
                throw new Error("You don't have any coupon");
            if (coupon.used === true)
                throw new Error("This coupon is already used");
            const updateCoupon = yield prisma_1.default.coupons.updateMany({
                where: {
                    user_id: userId,
                },
                data: {
                    used: status
                },
            });
            return updateCoupon;
        }
        catch (err) {
            throw err;
        }
    });
}
function FindCouponByUserIdService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const coupon = yield FindCouponByUserId(userId);
            return coupon;
        }
        catch (err) {
            throw err;
        }
    });
}
function UpdateCouponStatusService(userId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedCoupon = yield UpdateCouponStatus(userId, status);
            return updatedCoupon;
        }
        catch (err) {
            throw err;
        }
    });
}
