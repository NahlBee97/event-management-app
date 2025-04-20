import { Router } from "express";
import { FindTransactionByUserIdController } from "../controllers/transaction.controller";

const router = Router();

// get transaction list by user id
router.get("/transactions/:id", FindTransactionByUserIdController);

export default router;
