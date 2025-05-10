interface IPayload {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface IUserReqParam {
  user: IPayload;
  isLogin: boolean;
}
  

declare global {
  namespace Express {
    export interface Request {
      data?: IUserReqParam;
    }
  }
}
