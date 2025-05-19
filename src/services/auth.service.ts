import { FE_URL, SECRET_KEY } from "../config";
import { ILogin, IRegister } from "../interfaces/auth.interface";
import prisma from "../lib/prisma";
import { hash, genSaltSync, compare } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Transporter } from "../utils/nodemailer";
import handlebars from "handlebars";
import path from "path";
import fs from "fs";

export async function FindUserByEmail(email: string) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function Register(bodyData: IRegister) {
  try {
    const { first_name, last_name, email, password, role, referral_code_used } =
      bodyData;

    const user = await FindUserByEmail(email);

    if (user) throw new Error("Email already registered");

    //hashing password
    const salt = genSaltSync(10);
    const hashedPassword = await hash(password, salt);

    //generate referral code
    const yearNow = String(new Date().getFullYear());
    const referral_code = "REF" + first_name.toUpperCase() + yearNow;

    const newUser = await prisma.$transaction(async (t) => {
      const registeredUser = await t.users.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: hashedPassword,
          role: role,
          referral_code: referral_code,
        },
      });

      return registeredUser;
    });

    if (referral_code_used) {
      await UpdateReferralLogs(email, referral_code_used);
      await UpdatePoint(referral_code_used);
      await GiveCoupon(email);
    };

    //send email
    const templatePath = path.join(
      __dirname,
      "../templates",
      "register-template.hbs"
    );

    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const compiledTemplate = handlebars.compile(templateSource);

    const payload = {
      email: newUser.email,
    };

    const token = sign(payload, String(SECRET_KEY), { expiresIn: "1h" });
    const html = compiledTemplate({
      first_name,
      email,
      fe_url: `${FE_URL}/verify?token=${token}`,
    });

    await Transporter.sendMail({
      from: "EOHelper",
      to: email,
      subject: "Welcome",
      html,
    });

    return newUser;
  } catch (err) {
    throw err;
  }
}

async function VerifyAccount(token: string) {
  try {
    const { email } = verify(token, String(SECRET_KEY)) as JwtPayload;

    await prisma.users.update({
      where: {
        email,
      },
      data: {
        isverivied: true,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function UpdateReferralLogs(
  email: string,
  referral_code_used: string,
) {
  try {
    //check if referrer exist
    const referrer = await prisma.users.findFirst({
      where: {
        referral_code: referral_code_used,
      },
    });

    if (!referrer) {
      const user = await FindUserByEmail(email);
      await prisma.users.delete({
        where: {id: user?.id}
      })
      throw new Error("Can not find referrer");
    };

    //update referral logs
    const user = await FindUserByEmail(email);

    if (!user) throw new Error("Can not find the user: referral");

    await prisma.referral_logs.create({
      data: {
        user_id: user.id,
        referral_code_used: referral_code_used,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function UpdatePoint(referral_code_used: string) {
  try {
    // find referrer
    const referrer = await prisma.users.findFirst({
      where: {
        referral_code: referral_code_used,
      },
    });
    if (!referrer) throw new Error("Can not find referrer");
    //create default referrer point
    const currentDate = new Date();
    const expiredAt = new Date(
      currentDate.setMonth(currentDate.getMonth() + 3)
    );

    //find referrer in table points
    let referrerPoint = await prisma.points.findFirst({
      select: {
        points: true,
      },
      where: {
        user_id: referrer.id,
      },
    });

    if (referrerPoint) {
      referrerPoint.points += 10000;
      await prisma.points.update({
        where: {
          user_id: referrer.id,
        },
        data: {
          points: referrerPoint.points,
          expired_at: expiredAt,
        },
      });
    } else {
      await prisma.points.create({
        data: {
          user_id: referrer.id,
          points: 0,
          expired_at: expiredAt,
        },
      });
    }
  } catch (err) {
    throw err;
  }
}

//give coupon
async function GiveCoupon(email: string) {
  try {
    const user = await FindUserByEmail(email);
    if (!user) throw new Error("Can not find the user: coupon");

    const code = "COUPON" + user?.first_name;

    await prisma.coupons.create({
      data: {
        user_id: user.id,
        discount_percentage: 5,
        code: code,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function Login(bodyData: ILogin) {
  try {
    const { email, password } = bodyData;

    const user = await FindUserByEmail(email);

    if (!user) throw new Error("Email does not exist");

    const checkPass = await compare(password, user.password);

    if (!checkPass) throw new Error("Wrong Password");

    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      referral_code: user.referral_code,
      profile_picture: user.profile_picture,
    };

    const token = sign(payload, String(SECRET_KEY), { expiresIn: "1h" });

    return { user: payload, token };
  } catch (err) {
    throw err;
  }
}

async function VerifyReset(email: string) {
  try {
    const templatePath = path.join(
      __dirname,
      "../templates",
      "verify-reset-template.hbs"
    );

    const payload = {
      email,
    };

    const token = sign(payload, String(SECRET_KEY), { expiresIn: "24h" });

    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const compiledTemplate = handlebars.compile(templateSource);

    const html = compiledTemplate({
      email,
      fe_url: `${FE_URL}/reset-password?token=${token}`,
    });

    await Transporter.sendMail({
      from: "EOHelper",
      to: email,
      subject: "Reset Password",
      html,
    });
  } catch (err) {
    throw err;
  }
}

async function ResetPassword(new_password: string, token: string) {
  try {
    const { email } = verify(token, String(SECRET_KEY)) as JwtPayload;

    const user = await FindUserByEmail(email);

    if (!user) throw new Error("User does not exist");

    const salt = genSaltSync(10);
    const hashedPassword = await hash(new_password, salt);

    await prisma.users.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function RegisterService(bodyData: IRegister) {
  try {
    const newUser = await Register(bodyData);

    return newUser;
  } catch (err) {
    throw err;
  }
}

export async function VerifyAccountService(token: string) {
  try {
    await VerifyAccount(token);
  } catch (err) {
    throw err;
  }
}

export async function LoginService(bodyData: ILogin) {
  try {
    const user = await Login(bodyData);

    return user;
  } catch (err) {
    throw err;
  }
}

export async function ResetPasswordService(
  new_password: string,
  token: string
) {
  try {
    await ResetPassword(new_password, token);
  } catch (err) {
    throw err;
  }
}

export async function VerifyResetService(email: string) {
  try {
    await VerifyReset(email);
  } catch (err) {
    throw err;
  }
}
