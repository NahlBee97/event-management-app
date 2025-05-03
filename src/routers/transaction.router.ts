import { Router } from "express";
import { CreateTransactionController, EditTransactionByIdController, FindTransactionByIdController, FindTransactionByUserIdController } from "../controllers/transaction.controller";

const router = Router();

// add new transaction
router.post("/", CreateTransactionController )
// get transaction list by user id
router.get("/:user_id", FindTransactionByUserIdController);
// get transaction by id
router.get("/detail/:id", FindTransactionByIdController);
// update transaction status by id
router.put("/:id", EditTransactionByIdController);

export default router;
