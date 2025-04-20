import { Request, Response, NextFunction } from "express";
import { FindUserByIdService, EditUserByIdService } from "../services/user.service";

async function FindUserByIdController (req: Request, res: Response, next: NextFunction) {
    try {
        const userId = parseInt(req.params.id);
        const user = await FindUserByIdService(userId);

        res.status(200).send({
            message: `Get user by user id ${userId} success`,
            data: user
        })
    } catch(err) {
        next(err)
    }
}

async function EditUserByIdController (req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const bodyData = req.body;
      const editedUser = await EditUserByIdService(userId, bodyData);

      res.status(200).send({
        message: `Edit user by user id ${userId} success`,
        data: editedUser,
      });
    } catch (err) {
      next(err);
    }
}


export { FindUserByIdController, EditUserByIdController }