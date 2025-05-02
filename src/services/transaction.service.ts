import { transaction_statuses } from "@prisma/client";
import prisma from "../lib/prisma";
import { IBodyTransaction } from "../interfaces/transaction.interface";

async function CreateTransaction(bodyData: IBodyTransaction) {
  try {
    const { user_id, event_id, ticket_quantity, payment_date, payment_proof, payment_method, status } = bodyData;

    const newTransaction = await prisma.transactions.create({
      data: {
        user_id: user_id,
        event_id: event_id,
        ticket_quantity: ticket_quantity,
        payment_date: payment_date,
        payment_proof: payment_proof,
        payment_method: payment_method,
        status: status
      },
    });

    return newTransaction;
  } catch (err) {
    throw err;
  }
}

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

async function FindTransactionById(id: number) {
  try {
    const transaction = await prisma.transactions.findFirst({
      where: {
        id,
      },
    });

    if (!transaction)
      throw new Error("You don't have any transaction");

    return transaction;
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

// services
async function CreateTransactionService(bodyData: IBodyTransaction) {
  try {
    const newTransaction = await CreateTransaction(bodyData);

    return newTransaction;
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

async function FindTransactionByIdService(id: number) {
  try {
    const transactions = await FindTransactionById(id);

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

export { CreateTransactionService, FindTransactionByUserIdService, EditTransactionByIdService, FindTransactionByIdService };
