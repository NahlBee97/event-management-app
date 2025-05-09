import { user_roles } from "@prisma/client";

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: user_roles;
  profile_picture?: string;
  referral_code?: string;
  created_at: Date;
}

export interface IBodyUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: user_roles;
  profile_picture: string;
  referral_code: string;
  created_at: Date;
}
