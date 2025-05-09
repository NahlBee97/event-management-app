import { Request, Response, NextFunction } from "express";
import {
  FindUserByIdService,
  EditUserByIdService,
  DeleteUserByIdService,
  GetAllUserService,
} from "../services/user.service";

export async function GetAllUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const params = req.query.email as string;
    const users = await GetAllUserService(params);

    if (params) {
      res.status(200).send({
        message: `Get user by email ${params} success`,
        data: users,
      });
    } else 
    res.status(200).send({
      message: `Get all user success`,
      data: users,
    });
  } catch (err) {
    next(err);
  }
}

export async function FindUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.id);
    const user = await FindUserByIdService(userId);

    res.status(200).send({
      message: `Get user by user id ${userId} success`,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

export async function EditUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

export async function DeleteUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.id);
    await DeleteUserByIdService(userId);

    res.status(200).send({
      message: `Delete user by user id ${userId} success`,
    });
  } catch (err) {
    next(err);
  }
}
