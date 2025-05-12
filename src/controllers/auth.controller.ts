import { Request, Response, NextFunction } from "express";
import { LoginService, RegisterService, VerifyAccountService } from "../services/auth.service";
import { IUserReqParam } from "../custom";
import { UpdateUserService } from "../services/user.service";

export async function RegisterController(
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

export async function LoginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bodyData = req.body;
    const data = await LoginService(bodyData);

    res.status(200).cookie("access_token", data.token).send({
      message: "Login Success",
      data: data.user,
    });
  } catch (err) {
    next(err);
  }
}

export async function UpdateProfileController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { file } = req;
    const { email } = req.user as IUserReqParam;

    if (!file) throw new Error("File not found");
    if (!email) throw new Error("Email not found");
    
    await UpdateUserService(file, email);

    res.status(200).send({
      message: `Update Profile success`,
    });
  } catch (err) {
    next(err);
  }
}

export async function VerifyAccountController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.body.token;
    await VerifyAccountService(token);
  } catch (err) {
    next(err);
  }
}