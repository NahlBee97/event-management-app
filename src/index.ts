import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors';

import { PORT } from "./config";

import UserRouter from "./routers/user.router";
import EventRouter from './routers/event.router'
import VoucherRouter from './routers/voucher.router'
import ReviewRouter from './routers/review.reouter'
import PointRouter from "./routers/point.router"
import ReferralRouter from "./routers/referral.router"
import CouponRouter from "./routers/coupon.router"
import TransactionRouter from "./routers/transaction.router"

const port = PORT || 8080;
const app: Application = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

app.get('/', (res: Response, req: Request) => {
  console.log('welcome');
})

app.use('/api/event', EventRouter)
app.use('/api/voucher', VoucherRouter)
app.use('/api/review', ReviewRouter)
app.use("/api", UserRouter);
app.use("/api", PointRouter);
app.use("/api", ReferralRouter);
app.use("/api", CouponRouter);
app.use("/api", TransactionRouter);

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
