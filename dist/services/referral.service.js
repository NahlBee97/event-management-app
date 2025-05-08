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
exports.FindReferralByUserIdService = FindReferralByUserIdService;
const prisma_1 = __importDefault(require("../lib/prisma"));
const user_service_1 = require("./user.service");
function FindReferralByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.FindUserById)(userId);
            const referralCode = user === null || user === void 0 ? void 0 : user.referral_code;
            if (!referralCode) {
                throw new Error("Referral code must be a valid string");
            }
            ;
            const referrals = yield prisma_1.default.referral_logs.findMany({
                where: {
                    referral_code_used: referralCode
                },
            });
            if (referrals.length === 0)
                throw new Error("You have no referral yet");
            return referrals;
        }
        catch (err) {
            throw err;
        }
    });
}
function FindReferralByUserIdService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const referrals = yield FindReferralByUserId(userId);
            return referrals;
        }
        catch (err) {
            throw err;
        }
    });
}
