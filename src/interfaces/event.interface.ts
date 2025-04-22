export interface ISearchEvent {
    organizer: string;
    category: string;
    start_date: string; // ISO date string
    end_date: string;   // ISO date string
    min_price: string; // 
    max_price: string
}