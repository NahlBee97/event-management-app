import { Router } from "express";
import { CreateTransactionController, EditTransactionByIdController, FindTransactionByIdController, FindTransactionByUserIdController } from "../controllers/transaction.controller";

const router = Router();

// add new transaction
router.post("/transactions", CreateTransactionController )
// get transaction list by user id
router.get("/transactions/:user_id", FindTransactionByUserIdController);
// get transaction by id
router.get("/transactions/detail/:id", FindTransactionByIdController);
// update transaction status by id
router.put("/transactions/:id", EditTransactionByIdController);

export default router;
