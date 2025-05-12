import { Request, Response, NextFunction } from "express";
import {
  FindUserByIdService,
  EditUserByIdService,
  DeleteUserByIdService,
  GetAllUserService,
} from "../services/user.service";
import { IUserReqParam } from "../custom";

export async function GetAllUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await GetAllUserService();

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
