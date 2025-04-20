import { Request, Response, NextFunction } from "express";
import { FindTransactionByUserIdService } from "../services/transaction.service";

async function FindTransactionByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.id);
    const transactions = await FindTransactionByUserIdService(userId);

    res.status(200).send({
      message: `Get transaction list by user id ${userId} success`,
      data: transactions,
    });
  } catch (err) {
    next(err);
  }
}

export { FindTransactionByUserIdController };
