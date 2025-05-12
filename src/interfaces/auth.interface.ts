import { user_roles } from "@prisma/client";

export interface IRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  referral_code: string;
  referral_code_used: string;
}

export interface ILogin {
  email: string;
  password: string;
}