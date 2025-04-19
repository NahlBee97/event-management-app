import express, { Application, Request, Response, NextFunction } from "express";

import { PORT } from "./config";

import UserRouter from "./routers/user.router";

const port = PORT;
const app: Application = express();

app.use(express.json());

app.use("/api", UserRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
