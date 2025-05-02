import { Request, Response, NextFunction } from "express";
import { LoginService, RegisterService } from "../services/auth.service";

async function RegisterController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bodyData = req.body;
    const newUser = await RegisterService(bodyData);

    res.status(200).send({
      message: `Register success`,
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
}

async function LoginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bodyData = req.body;
    const newUser = await LoginService(bodyData);

    res.status(200).send({
      message: `Login success`,
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
}

export { RegisterController, LoginController };
