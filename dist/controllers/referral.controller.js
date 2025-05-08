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
exports.FindReferralByUserIdController = FindReferralByUserIdController;
const referral_service_1 = require("../services/referral.service");
function FindReferralByUserIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.user_id);
            const referrals = yield (0, referral_service_1.FindReferralByUserIdService)(userId);
            res.status(200).send({
                message: `Get referrals by user id ${userId} success`,
                data: referrals,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
