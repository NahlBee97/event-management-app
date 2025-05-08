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
export interface ISearchEvent {
  organizer: string;
  category_id: string;
  start_date: string; // ISO date string
  end_date: string;   // ISO date string
  min_price: string; // 
  max_price: string
}
