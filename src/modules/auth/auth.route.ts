import { Router } from "express";
import authController from "./auth.controller";

const router = Router();
router.post("/",authController.loginUser)
const authRoute = router;
export default authRoute;