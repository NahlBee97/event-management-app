import { Request, Response, NextFunction } from "express";
import { FindUserByIdService } from "../services/user.service";


async function FindUserByIdController (req: Request, res: Response, next: NextFunction) {
    try {
        const userId = parseInt(req.params.id);
        const user = await FindUserByIdService(userId);

        res.status(200).send({
            message: `Get user by user id ${req.params.id} success`,
            data: user
        })
    } catch(err) {
        next(err)
    }
}

export { FindUserByIdController }