export interface IBodyEventVoucher {
  name: string;
  event_id: number;
  description: string;
  tnc_description: string;
  discount_percentage: number;
  start_date: Date;
  expired_date: Date;
  code: string;
  max_usage: number;
  current_usage: number;
}
