import { IBodyUser } from "../interfaces/user.interface";
import prisma from "../lib/prisma";

//find user by id function
async function FindUserById(userId: number) {
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

// find user by id service
async function FindUserByIdService(userId: number) {
  try {
    const user = await FindUserById(userId);

    if (!user) throw new Error("No User Found");

    return user;
  } catch (err) {
    throw err;
  }
}

//edit user by id service
async function EditUserByIdService(userId: number, body: IBodyUser) {
  try {
    const editedUser = await EditUserById(userId, body);

    return editedUser;

  } catch (err) {
    throw err;
  }
}

export { FindUserByIdService, EditUserByIdService };
// export often use function
export { FindUserById } ;