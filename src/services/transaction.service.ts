import { transaction_statuses } from "@prisma/client";
import prisma from "../lib/prisma";
import { IBodyTransaction } from "../interfaces/transaction.interface";
import path from "path";
import fs from "fs"
import { Transporter } from "../utils/nodemailer";
import handlebars from "handlebars";

async function CreateTransaction(bodyData: IBodyTransaction) {
  try {
    const { user_id, event_id, ticket_quantity } = bodyData;

    const newTransaction = await prisma.transactions.create({
      data: {
        user_id: user_id,
        event_id: event_id,
        ticket_quantity: ticket_quantity,
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
    const transaction = await prisma.transactions.findMany({
      where: {
        id
      },
      include: {
        events: true // Include event details
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

    const transaction = await prisma.transactions.findFirst({
      where: {
        id
      },
      include: {
        events: true,
        users: true
      }
    });

    const event_title = transaction?.events.name; 

    const user_email = transaction?.users.email;
    const first_name = transaction?.users.first_name;

    //send email
        const templatePath = path.join(
          __dirname,
          "../templates",
          "transaction-template.hbs"
        );
    
        const templateSource = fs.readFileSync(templatePath, "utf-8");
        const compiledTemplate = handlebars.compile(templateSource);
    
        const html = compiledTemplate({
          first_name,
          event_title,
          status,
        });
    
        await Transporter.sendMail({
          from: "EOHelper",
          to: user_email,
          subject: `Your Purchase is ${status}`,
          html,
        });

    return updatedTransaction;
  } catch (err) {
    throw err;
  }
}

async function DeleteTransactionById(id: number) {
  try {
    await prisma.transactions.delete({
      where: {
        id,
      }
    });
  } catch (err) {
    throw err;
  }
}

// services
export async function CreateTransactionService(bodyData: IBodyTransaction) {
  try {
    const newTransaction = await CreateTransaction(bodyData);

    return newTransaction;
  } catch (err) {
    throw err;
  }
}

export async function FindTransactionByUserIdService(userId: number) {
  try {
    const transactions = await FindTransactionByUserId(userId);

    return transactions;
  } catch (err) {
    throw err;
  }
}

export async function FindTransactionsByOrganizerIdService(organizerId: number) {
  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        events: {
          organizer_id: organizerId,
        },
      },
      include: {
        events: true, // Include event details
        users: true, // Include user details who made the transaction
      },
    });

    return transactions;
  } catch (error) {
    throw error;
  }
}

export async function FindTransactionByIdService(id: number) {
  try {
    const transactions = await FindTransactionById(id);

    return transactions;
  } catch (err) {
    throw err;
  }
}

export async function EditTransactionByIdService(id: number, status: transaction_statuses) {
  try {
    const updatedTransaction = await EditTransactionById(id, status);

    return updatedTransaction;
  } catch (err) {
    throw err;
  }
}

export async function DeleteTransactionByIdService(
  id: number
) {
  try {
    await DeleteTransactionById(id);

  } catch (err) {
    throw err;
  }
}
