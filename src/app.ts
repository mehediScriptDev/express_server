import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import userRouter from "./modules/users/user.route";
import profilesRoute from "./modules/profiles/profile.route";
import authRoute from "./modules/auth/auth.route";
import logger from "./middleware/logger";
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.text());
app.use(logger);


app.use("/api/users", userRouter)

app.use("/api/profiles",profilesRoute)

app.use("/api/auth",authRoute)




export default app;
