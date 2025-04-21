import { NextFunction, Request, Response } from "express";
import { GetReviewByEventIdSevice, GetReviewByUserIdservice } from "../services/review.service";

export async function GetReviewByEventIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const eventId = req?.params?.id

        const review = await GetReviewByEventIdSevice(eventId);

        res.status(200).send({
            success: true,
            message: `Get review with id ${eventId} is success`,
            data: review
        })
    } catch (err) {
        next(err)
    }
}

export async function GetReviewByUserIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const eventId = req?.params?.id

        const review = await GetReviewByUserIdservice(eventId);

        res.status(200).send({
            success: true,
            message: `Get review with user id ${eventId} is success`,
            data: review
        })
    } catch (err) {
        next(err)
    }
}