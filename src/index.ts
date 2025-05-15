import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors';

import { FE_LOCAL_URL, FE_URL, PORT } from "./config";

import UserRouter from "./routers/user.router";
import EventRouter from "./routers/event.router";
import VoucherRouter from "./routers/voucher.router";
import ReviewRouter from "./routers/review.router";
import PointRouter from "./routers/point.router";
import ReferralRouter from "./routers/referral.router";
import CouponRouter from "./routers/coupon.router";
import TransactionRouter from "./routers/transaction.router";
import AuthRouter from "./routers/auth.router";

const port = PORT;
const app: Application = express();

app.use(
  cors({
    origin: FE_URL,
    credentials: true,
  })
);

app.use(express.json());

// Use CORS middleware

app.use(
  cors({
    origin: FE_URL || FE_LOCAL_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // (if using cookies/auth)
  })
);

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/events", EventRouter);
app.use("/api/vouchers", VoucherRouter);
app.use("/api/coupons", CouponRouter);
app.use("/api/reviews", ReviewRouter);
app.use("/api/referrals", ReferralRouter);
app.use("/api/points", PointRouter);
app.use("/api/transactions", TransactionRouter);

// ERROR HANDLING MIDDLEWARE
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
