import { Router } from "express";
import { CreateTransactionController, DeleteTransactionByIdController, EditTransactionByIdController, FindTransactionByIdController, FindTransactionByOrganizerIdController, FindTransactionByUserIdController } from "../controllers/transaction.controller";
import { EOGuard, VerifyToken } from "../middlewares/auth.middleware";

const router = Router();

// add new transaction
router.post("/", VerifyToken, CreateTransactionController )
// get transaction list by user id
router.get("/user/:user_id", VerifyToken, FindTransactionByUserIdController);
// get transaction list by organizer id
router.get("/organizer/:organizer_id", VerifyToken, FindTransactionByOrganizerIdController);
// get transaction by id
router.get("/detail/:id", VerifyToken, FindTransactionByIdController);
// update transaction status by id
router.patch("/:id", VerifyToken, EOGuard, EditTransactionByIdController);
//delete
router.delete("/:id", VerifyToken, DeleteTransactionByIdController);

export default router;
