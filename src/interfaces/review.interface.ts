export interface IReview {
    user_id: number,
    event_id: number,
    message: string,
    rating: number,
    created_at: Date
}