import { Router } from "express";
import { EditTransactionByIdController, FindTransactionByUserIdController } from "../controllers/transaction.controller";

const router = Router();

// get transaction list by user id
router.get("/transactions/:user_id", FindTransactionByUserIdController);
// update transaction status by id
router.put("/transactions/:id", EditTransactionByIdController);

export default router;
