import express, { Application, Request, Response, NextFunction } from "express";

import { PORT } from "./config";

import UserRouter from "./routers/user.router";
import EventRouter from './routers/event.router'
import VoucherRouter from './routers/voucher.router'
import ReviewRouter from './routers/review.reouter'
import PointRouter from "./routers/point.router"
import ReferralRouter from "./routers/referral.router"
import CouponRouter from "./routers/coupon.router"
import TransactionRouter from "./routers/transaction.router"
import RegisterRouter from "./routers/auth.router"

const port = PORT || 8080;
const app: Application = express();

app.use(express.json());

app.get('/', (res: Response, req: Request) => {
  console.log('welcome');
})

app.use("/", RegisterRouter);
app.use("/api/users", UserRouter);
app.use('/api/events', EventRouter)
app.use('/api/vouchers', VoucherRouter)
app.use("/api/coupons", CouponRouter);
app.use('/api/reviews', ReviewRouter)
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
