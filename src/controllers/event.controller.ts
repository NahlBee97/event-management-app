import { NextFunction, Request, Response } from "express";
import { GetAllEventService } from "../services/event.service";

export async function GetAllEventController(req: Request, res: Response, next: NextFunction) {
    try {
        const events = await GetAllEventService();

        res.status(200).send({
            message: 'Success',
            count: events.length,
            data: events
        })
    } catch (err) {
        next(err)
    }
}