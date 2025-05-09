
export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  profile_picture?: string;
  referral_code?: string;
  created_at: Date;
}

export interface IBodyUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  profile_picture: string;
  referral_code: string;
  created_at: Date;
}
