import { Console } from "console";
import { IBodyUser } from "../interfaces/user.interface";
import prisma from "../lib/prisma";
import { cloudinaryRemove, cloudinaryUpload } from "../utils/cloudinary";
import { FindUserByEmail } from "./auth.service";


//find user by id function
export async function FindUserById(userId: number) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

//edit user by id function
async function EditUserById(userId: number, body: IBodyUser) {
  try {
    const existedUser = await FindUserById(userId);
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      profile_picture,
    } = body;
    
    const editedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        first_name: first_name || existedUser?.first_name,
        last_name: last_name || existedUser?.last_name,
        email: email || existedUser?.email,
        password: password || existedUser?.password,
        role: role || existedUser?.role,
        profile_picture: profile_picture || existedUser?.profile_picture,
      },
    });
    
    return editedUser;
    
  } catch (err) {
    throw err;
  }
}

async function DeleteUserById(userId: number) {
  try {
    // Delete related data from the referral_logs table where the user_id is the user
    await prisma.referral_logs.deleteMany({
      where: {
        user_id: userId,
      },
    });
    
    // Delete related data from the coupons table
    await prisma.coupons.deleteMany({
      where: {
        user_id: userId,
      },
    });
    
    // Delete related data from the points table
    await prisma.points.deleteMany({
      where: {
        user_id: userId,
      },
    });
    
    // Delete related data from the review table
    await prisma.reviews.deleteMany({
      where: {
        user_id: userId,
      },
    });
    
    // Delete related data from the transactions table
    await prisma.transactions.deleteMany({
      where: {
        user_id: userId,
      },
    });

    // Delete related data from the events table
    await prisma.events.deleteMany({
      where: {
        organizer_id: userId,
      },
    });

    // Delete related data from the user_vouchers table
    await prisma.user_vouchers.deleteMany({
      where: {
        user_id: userId,
      },
    });
    
    // Finally, delete the user record
    await prisma.users.delete({
      where: {
        id: userId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function GetAllUserService() {

  const users = await prisma.users.findMany();

  if (!users) throw new Error("No Users Yet");
  
  return users;
}

// Find user by id service
export async function FindUserByIdService(userId: number) {
  try {
    const user = await FindUserById(userId);
    return user;
  } catch (err) {
    throw err;
  }
}
//edit user by id service
export async function EditUserByIdService(userId: number, body: IBodyUser) {
  try {
    const editedUser = await EditUserById(userId, body);

    return editedUser;

  } catch (err) {
    throw err;
  }
}

export async function UpdateUserService(file: Express.Multer.File, email: string) {
  let url = "";
  try {
    const checkUser = await FindUserByEmail(email);
    if (!checkUser) throw new Error("User not found");

    await prisma.$transaction(async (t) => {
      const { secure_url } = await cloudinaryUpload(file);
      url = secure_url;
      const splitUrl = secure_url.split("/");
      const fileName = splitUrl[splitUrl.length - 1];

      await t.users.update({
        where: {
          id: checkUser.id
        },
        data: {
          profile_picture: fileName
        }
      })
    })
  } catch (err) {
    await cloudinaryRemove(url);
    throw err;
  }
}

export async function DeleteUserByIdService(userId: number) {
  try {
    await DeleteUserById(userId);
  } catch (err) {
    throw err;
  }
}
