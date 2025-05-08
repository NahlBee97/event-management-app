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
exports.GetVoucherByEventIdController = GetVoucherByEventIdController;
exports.GetVoucherByUserIdController = GetVoucherByUserIdController;
exports.CreateVoucherController = CreateVoucherController;
exports.EditVoucherByIdController = EditVoucherByIdController;
exports.DeleteVoucherByIdController = DeleteVoucherByIdController;
const voucher_service_1 = require("../services/voucher.service");
function GetVoucherByEventIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const eventId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
            const voucher = yield (0, voucher_service_1.GetVoucherByEventIdServices)(eventId);
            res.status(200).send({
                success: true,
                message: `Get voucher with id ${eventId} is success`,
                data: voucher
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetVoucherByUserIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
            const voucher = yield (0, voucher_service_1.GetVoucherByUserIdServices)(userId);
            res.status(200).send({
                success: true,
                message: `Get voucher with user id ${userId} is success`,
                data: voucher
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function CreateVoucherController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const voucher = yield (0, voucher_service_1.CreateVoucherService)(req.body);
            res.status(200).send({
                success: true,
                message: `create new voucher for event id ${req.body.event_id} is success`,
                data: voucher,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function EditVoucherByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const voucher = yield (0, voucher_service_1.EditVoucherByIdService)(id, req.body);
            res.status(200).send({
                success: true,
                message: `Update voucher with id ${req.body.event_id} is success`,
                data: voucher,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function DeleteVoucherByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            yield (0, voucher_service_1.DeleteVoucherByIdService)(id);
            res.status(200).send({
                success: true,
                message: `Delete voucher with id ${req.body.event_id} is success`,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
