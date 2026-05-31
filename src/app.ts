import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import fs from "fs";
import {  pool } from "./db";
import userRouter from "./modules/users/user.route";
import profilesRoute from "./modules/profiles/profile.route";
import authRoute from "./modules/auth/auth.route";
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.text());
app.use((req, res, next) => {
  console.log('Method - URL - Time:',req.method,req.url, Date.now());
  const log = `Method- ${req.method} - Url- ${req.url} - Time- ${Date.now()}`;
  fs.appendFile("logger.txt",log,(err)=>{
    console.log(err);
    
  })
  next();
});


app.use("/api/users",userRouter)

app.use("/api/users/:id",userRouter)

app.use("/api/profiles",profilesRoute)

app.use("/api/auth",authRoute)




export default app;
