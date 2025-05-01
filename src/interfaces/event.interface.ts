export interface IBodyEvent {
  name: string; 
  description: string; 
  category_id?: number;
  start_date: Date;
  end_date: Date;
  total_seats: number;
  remaining_seats: number;
  price: number;
}
