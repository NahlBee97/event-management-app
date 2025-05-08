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
exports.FindCouponByUserIdController = FindCouponByUserIdController;
exports.UpdateCouponStatusController = UpdateCouponStatusController;
const coupon_service_1 = require("../services/coupon.service");
function FindCouponByUserIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.user_id);
            const coupon = yield (0, coupon_service_1.FindCouponByUserIdService)(userId);
            res.status(200).send({
                message: `Get coupon by user id ${userId} success`,
                data: coupon,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function UpdateCouponStatusController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.user_id);
            const status = req.body.used;
            const updatedCoupon = yield (0, coupon_service_1.UpdateCouponStatusService)(userId, status);
            res.status(200).send({
                message: "Update coupon status success",
                data: updatedCoupon,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
