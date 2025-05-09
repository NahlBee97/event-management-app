import { NextFunction, Request, Response } from "express";
import { GetEventDetailByIdService } from "../services/event_detail.services";

export async function GetEventDetailByIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const eventId = req?.params?.id

        const event = await GetEventDetailByIdService(eventId);

        res.status(200).send({
            success: true,
            message: `Get event with id ${eventId} is success`,
            data: event
        })
    } catch (err) {
        next(err)
    }
}