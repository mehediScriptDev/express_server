import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import {  pool } from "./db";
import userRouter from "./modules/users/user.route";
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.text());



app.use("/api/users",userRouter)

app.use("/api/users/:id",userRouter)

app.use("/api/users", userRouter)





export default app;
