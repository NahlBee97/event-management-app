import { NextFunction, Request, Response } from "express"
import { SearchEventService } from "../services/search_event.service"
import { ISearchEvent } from "../interfaces/event.interface";


export async function SearchEventController(req: Request, res: Response, next: NextFunction) {
    try {
        const searchParams = req.query as unknown as ISearchEvent;
        const data = await SearchEventService(searchParams)

        const message = Array.isArray(data) && data.length === 0
            ? `Event not found`
            : "search event is success";

        res.status(200).send({
            success: true,
            message,
            data
        })
    } catch (error) {
        next(error)
    }

}