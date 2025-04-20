import { Request, Response, NextFunction } from "express";
import { EditTransactionByIdService, FindTransactionByUserIdService } from "../services/transaction.service";

async function FindTransactionByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.user_id);
    const transactions = await FindTransactionByUserIdService(userId);

    res.status(200).send({
      message: `Get transaction list by user id ${userId} success`,
      data: transactions,
    });
  } catch (err) {
    next(err);
  }
}

async function EditTransactionByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const updatedTransaction = await EditTransactionByIdService(id, status);

    res.status(200).send({
      message: `Update transaction status by id ${id} success`,
      data: updatedTransaction,
    });
  } catch (err) {
    next(err);
  }
}

export { FindTransactionByUserIdController, EditTransactionByIdController };
