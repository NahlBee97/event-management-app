"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
const router = (0, express_1.Router)();
// add new transaction
router.post("/", transaction_controller_1.CreateTransactionController);
// get transaction list by user id
router.get("/:user_id", transaction_controller_1.FindTransactionByUserIdController);
// get transaction by id
router.get("/detail/:id", transaction_controller_1.FindTransactionByIdController);
// update transaction status by id
router.put("/:id", transaction_controller_1.EditTransactionByIdController);
//delete
router.delete("/:id", transaction_controller_1.DeleteTransactionByIdController);
exports.default = router;
