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
exports.CreateTransactionController = CreateTransactionController;
exports.FindTransactionByUserIdController = FindTransactionByUserIdController;
exports.FindTransactionByIdController = FindTransactionByIdController;
exports.EditTransactionByIdController = EditTransactionByIdController;
exports.DeleteTransactionByIdController = DeleteTransactionByIdController;
const transaction_service_1 = require("../services/transaction.service");
function CreateTransactionController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bodyData = req.body;
            const newTransaction = yield (0, transaction_service_1.CreateTransactionService)(bodyData);
            res.status(200).send({
                message: "Create new transaction success",
                data: newTransaction,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function FindTransactionByUserIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.user_id);
            const transactions = yield (0, transaction_service_1.FindTransactionByUserIdService)(userId);
            res.status(200).send({
                message: `Get transaction list by user id ${userId} success`,
                data: transactions,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function FindTransactionByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const transaction = yield (0, transaction_service_1.FindTransactionByIdService)(id);
            res.status(200).send({
                message: `Get transaction by id ${id} success`,
                data: transaction,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function EditTransactionByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const { status } = req.body;
            const updatedTransaction = yield (0, transaction_service_1.EditTransactionByIdService)(id, status);
            res.status(200).send({
                message: `Update transaction status by id ${id} success`,
                data: updatedTransaction,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function DeleteTransactionByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            yield (0, transaction_service_1.DeleteTransactionByIdService)(id);
            res.status(200).send({
                message: `Delete transaction by id ${id} success`,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
