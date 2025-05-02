import { Request, Response, NextFunction } from "express";
import { CreateTransactionService, EditTransactionByIdService, FindTransactionByIdService, FindTransactionByUserIdService } from "../services/transaction.service";
import { FindUserByIdService } from "../services/user.service";

async function CreateTransactionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bodyData = req.body;
    const newTransaction = await CreateTransactionService(bodyData);

    res.status(200).send({
      message: "Create new transaction success",
      data: newTransaction,
    });
  } catch (err) {
    next(err);
  }
}

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

async function FindTransactionByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const transaction = await FindTransactionByIdService(id);

    res.status(200).send({
      message: `Get transaction by id ${id} success`,
      data: transaction,
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

export { CreateTransactionController, FindTransactionByUserIdController, EditTransactionByIdController, FindTransactionByIdController };
