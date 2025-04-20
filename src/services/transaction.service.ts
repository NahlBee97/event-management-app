import { transaction_statuses } from "@prisma/client";
import prisma from "../lib/prisma";

async function FindTransactionByUserId(userId: number) {
  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        user_id: userId,
      },
    });

    if (transactions.length === 0)
      throw new Error("You don't have any transaction");

    return transactions;
  } catch (err) {
    throw err;
  }
}

async function EditTransactionById(id: number, status: transaction_statuses) {
  try {
    const updatedTransaction = await prisma.transactions.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });

    return updatedTransaction;
  } catch (err) {
    throw err;
  }
}

async function FindTransactionByUserIdService(userId: number) {
  try {
    const transactions = await FindTransactionByUserId(userId);

    return transactions;
  } catch (err) {
    throw err;
  }
}

async function EditTransactionByIdService(id: number, status: transaction_statuses) {
  try {
    const updatedTransaction = await EditTransactionById(id, status);

    return updatedTransaction;
  } catch (err) {
    throw err;
  }
}

export { FindTransactionByUserIdService, EditTransactionByIdService };
