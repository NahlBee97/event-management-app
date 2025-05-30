import { user_roles } from "@prisma/client";

export interface IRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: user_roles;
  referral_code_used: string;
}

export interface ILogin {
  email: string;
  password: string;
}