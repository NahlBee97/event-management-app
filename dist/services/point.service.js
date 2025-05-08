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
exports.FindPointByUserIdService = FindPointByUserIdService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function FindPointByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userPoint = yield prisma_1.default.points.findFirst({
                where: {
                    user_id: userId,
                },
            });
            if (!userPoint)
                throw new Error("You don't have any points yet");
            return userPoint;
        }
        catch (err) {
            throw err;
        }
    });
}
function FindPointByUserIdService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userPoint = yield FindPointByUserId(userId);
            return userPoint;
        }
        catch (err) {
            throw err;
        }
    });
}
