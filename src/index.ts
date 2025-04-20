import express, { Application, Request, Response, NextFunction } from "express";

import { PORT } from "./config";

import UserRouter from "./routers/user.router";
import PointRouter from "./routers/point.router"
import ReferralRouter from "./routers/referral.router"
import CouponRouter from "./routers/coupon.router"
import TransactionRouter from "./routers/transaction.router"

const port = PORT;
const app: Application = express();

app.use(express.json());

app.use("/api", UserRouter);
app.use("/api", PointRouter);
app.use("/api", ReferralRouter);
app.use("/api", CouponRouter);
app.use("/api", TransactionRouter);

// ERROR HANDLING MIDDLEWARE
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    error: true,
    message: err.message,
  });
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
