import { NextFunction, Request, Response } from "express"
import { SearchEventService } from "../services/search_event.service"
import { ISearchEvent } from "../interfaces/event.interface";


export async function SearchEventController(req: Request, res: Response, next: NextFunction) {
    try {
        const searchParams = req.query as unknown as ISearchEvent;
        const data = await SearchEventService(searchParams)

        res.status(200).send({
            success: true,
            message: `search event is success`,
            data
        })
    } catch (error) {
        next()
    }

}