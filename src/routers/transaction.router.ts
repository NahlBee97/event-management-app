import { Router } from "express";
import { CreateTransactionController, EditTransactionByIdController, FindTransactionByUserIdController } from "../controllers/transaction.controller";

const router = Router();

// add new transaction
router.post("/transactions", CreateTransactionController )
// get transaction list by user id
router.get("/transactions/:user_id", FindTransactionByUserIdController);
// update transaction status by id
router.put("/transactions/:id", EditTransactionByIdController);

export default router;
