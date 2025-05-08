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
exports.GetVoucherByEventIdServices = GetVoucherByEventIdServices;
exports.GetVoucherByUserIdServices = GetVoucherByUserIdServices;
exports.CreateVoucherService = CreateVoucherService;
exports.EditVoucherByIdService = EditVoucherByIdService;
exports.DeleteVoucherByIdService = DeleteVoucherByIdService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function GetVoucherByEventIdServices(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const voucher = yield (prisma_1.default === null || prisma_1.default === void 0 ? void 0 : prisma_1.default.event_vouchers.findFirst({
                where: {
                    event_id: Number(params),
                },
            }));
            if (!voucher)
                throw new Error("Voucher not found");
            return voucher;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetVoucherByUserIdServices(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const voucher = yield (prisma_1.default === null || prisma_1.default === void 0 ? void 0 : prisma_1.default.user_vouchers.findFirst({
                where: {
                    user_id: Number(params),
                },
            }));
            if (!voucher)
                throw new Error("Voucher not found");
            return voucher;
        }
        catch (err) {
            throw err;
        }
    });
}
function CreateVoucherService(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, event_id, description, tnc_description, discount_percentage, start_date, expired_date, code, max_usage, current_usage, } = params;
            const voucher = yield prisma_1.default.event_vouchers.create({
                data: {
                    name: name,
                    event_id: event_id,
                    description: description,
                    tnc_description: tnc_description,
                    discount_percentage: discount_percentage,
                    start_date: start_date,
                    expired_date: expired_date,
                    code: code,
                    max_usage: max_usage,
                    current_usage: current_usage,
                },
            });
            return voucher;
        }
        catch (err) {
            throw err;
        }
    });
}
function EditVoucherByIdService(id, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, event_id, description, tnc_description, discount_percentage, start_date, expired_date, code, max_usage, current_usage, } = body;
            const voucher = yield prisma_1.default.event_vouchers.findFirst({
                where: {
                    id
                }
            });
            if (!voucher)
                throw new Error("Voucher not found");
            const updateVoucher = yield prisma_1.default.event_vouchers.update({
                where: {
                    id,
                },
                data: {
                    name: name || voucher.name,
                    event_id: event_id || voucher.event_id,
                    description: description || voucher.description,
                    tnc_description: tnc_description || voucher.tnc_description,
                    discount_percentage: discount_percentage || voucher.discount_percentage,
                    start_date: start_date || voucher.start_date,
                    expired_date: expired_date || voucher.expired_date,
                    code: code || voucher.code,
                    max_usage: max_usage || voucher.max_usage,
                    current_usage: current_usage || voucher.current_usage,
                },
            });
            return voucher;
        }
        catch (err) {
            throw err;
        }
    });
}
function DeleteVoucherByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const voucher = yield prisma_1.default.event_vouchers.findFirst({
                where: {
                    id,
                },
            });
            if (!voucher)
                throw new Error("Voucher not found");
            yield prisma_1.default.event_vouchers.delete({
                where: {
                    id,
                },
            });
        }
        catch (err) {
            throw err;
        }
    });
}
