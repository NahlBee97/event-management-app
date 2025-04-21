import { transaction_statuses } from "@prisma/client";

export interface IBodyTransaction {
  user_id: number;
  event_id: number;
  ticket_quantity: number;
  payment_date: Date;
  payment_proof: string;
  payment_method: string;
  status: transaction_statuses;
}
