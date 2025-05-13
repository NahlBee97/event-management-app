"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// add new transaction
router.post("/", auth_middleware_1.VerifyToken, transaction_controller_1.CreateTransactionController);
// get transaction list by user id
router.get("/:user_id", auth_middleware_1.VerifyToken, transaction_controller_1.FindTransactionByUserIdController);
// get transaction by id
router.get("/detail/:id", auth_middleware_1.VerifyToken, transaction_controller_1.FindTransactionByIdController);
// update transaction status by id
router.put("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.EOGuard, transaction_controller_1.EditTransactionByIdController);
//delete
router.delete("/:id", auth_middleware_1.VerifyToken, transaction_controller_1.DeleteTransactionByIdController);
exports.default = router;
