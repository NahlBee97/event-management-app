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
exports.CreateTransactionService = CreateTransactionService;
exports.FindTransactionByUserIdService = FindTransactionByUserIdService;
exports.FindTransactionByIdService = FindTransactionByIdService;
exports.EditTransactionByIdService = EditTransactionByIdService;
exports.DeleteTransactionByIdService = DeleteTransactionByIdService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function CreateTransaction(bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id, event_id, ticket_quantity } = bodyData;
            const newTransaction = yield prisma_1.default.transactions.create({
                data: {
                    user_id: user_id,
                    event_id: event_id,
                    ticket_quantity: ticket_quantity,
                },
            });
            return newTransaction;
        }
        catch (err) {
            throw err;
        }
    });
}
function FindTransactionByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactions = yield prisma_1.default.transactions.findMany({
                where: {
                    user_id: userId,
                },
            });
            if (transactions.length === 0)
                throw new Error("You don't have any transaction");
            return transactions;
        }
        catch (err) {
            throw err;
        }
    });
}
function FindTransactionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield prisma_1.default.transactions.findFirst({
                where: {
                    id,
                },
            });
            if (!transaction)
                throw new Error("You don't have any transaction");
            return transaction;
        }
        catch (err) {
            throw err;
        }
    });
}
function EditTransactionById(id, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedTransaction = yield prisma_1.default.transactions.update({
                where: {
                    id,
                },
                data: {
                    status: status,
                },
            });
            return updatedTransaction;
        }
        catch (err) {
            throw err;
        }
    });
}
function DeleteTransactionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma_1.default.transactions.delete({
                where: {
                    id,
                }
            });
        }
        catch (err) {
            throw err;
        }
    });
}
// services
function CreateTransactionService(bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newTransaction = yield CreateTransaction(bodyData);
            return newTransaction;
        }
        catch (err) {
            throw err;
        }
    });
}
function FindTransactionByUserIdService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactions = yield FindTransactionByUserId(userId);
            return transactions;
        }
        catch (err) {
            throw err;
        }
    });
}
function FindTransactionByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactions = yield FindTransactionById(id);
            return transactions;
        }
        catch (err) {
            throw err;
        }
    });
}
function EditTransactionByIdService(id, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedTransaction = yield EditTransactionById(id, status);
            return updatedTransaction;
        }
        catch (err) {
            throw err;
        }
    });
}
function DeleteTransactionByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield DeleteTransactionById(id);
        }
        catch (err) {
            throw err;
        }
    });
}
