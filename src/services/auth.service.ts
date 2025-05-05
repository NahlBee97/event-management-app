import { SECRET_KEY } from "../config";
import { ILogin, IRegister } from "../interfaces/auth.interface";
import prisma from "../lib/prisma";
import { hash, genSaltSync, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

async function FindUserByEmail(email: string) {
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
    const { first_name, last_name, email, password, role } = bodyData;

    const user = await FindUserByEmail(email);

    if (user) throw new Error("The email you are using is already exist");

    return await prisma.$transaction(async (t) => {
      function referralGenerator() {
        const yearNow = String(new Date().getFullYear());
        const referral_code = "REF" + first_name.toUpperCase() + yearNow;

        return referral_code;
      }

      const salt = genSaltSync(10);
      const hashedPassword = await hash(password, salt);

      const newUser = await t.users.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: hashedPassword,
          role: role,
          referral_code: referralGenerator(),
        },
      });

      const payload = {
        email: newUser.email,
      };

      const token = sign(payload, String(SECRET_KEY), { expiresIn: "15m" });

      return newUser;
    });
  } catch (err) {
    throw err;
  }
}

async function UpdateReferralLogs(bodyData: IRegister) {
  try {
    const { email, referral_code_used } = bodyData;
    //check if referrer exist
    const referrer = await prisma.users.findFirst({
      where: {
        referral_code: referral_code_used,
      },
    });

    if (!referrer) throw new Error("Can not find referrer");

    //update referral logs
    const user = await FindUserByEmail(email);

    if (!user) throw new Error("Can not find the user");

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

async function UpdatePoint(bodyData: IRegister) {
  try {
    const { referral_code_used } = bodyData;
    // find referrer
    const referrer = await prisma.users.findFirst({
      where: {
        referral_code: referral_code_used,
      },
    });
    if (!referrer) throw new Error("Can not find referrer");
    //see referrer point
    let referrerPoint = await prisma.points.findFirst({
      select: {
        points: true,
      },
      where: {
        user_id: referrer.id,
      },
    });
    if (!referrerPoint) {
      referrerPoint = { points: 0 };
    }

    // Update referrer points
    referrerPoint.points += 10000;
    await prisma.points.update({
      where: {
        user_id: referrer.id   
      },
      data: {
        points: referrerPoint.points
      }
    })
  } catch (err) {
    throw err;
  }
}

//give coupon
async function GiveCoupon(bodyData: IRegister) {
  try {
    const { email } = bodyData;
    const user = await FindUserByEmail(email);
    if (!user) throw new Error("Can not find user")

    function CodeGenerator() {
        const code = "COUPON" + user?.first_name;

        return code;
      }

    await prisma.coupons.create({
      data: {
        user_id: user.id,
        discount_percentage: 5,
        code: CodeGenerator() 
      }
    })
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
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };

    const token = sign(payload, String(SECRET_KEY), { expiresIn: "1h" });

    return {user: payload, token};
  } catch (err) {
    throw err;
  }
}

export async function RegisterService(bodyData: IRegister) {
  try {
    const newUser = await Register(bodyData);

    if (bodyData.referral_code_used) {
      //update referral log
      await UpdateReferralLogs(bodyData);
      //update referrer point
      await UpdatePoint(bodyData);
      //give coupon
      await GiveCoupon(bodyData);
    }

    return newUser;
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
