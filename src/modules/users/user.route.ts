import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import userController from "./user.controller";

const router = Router();
router.post("/", userController.createUser);
router.get("/", userController.getUser);
router.get("/:id",userController.getUserDetails);
router.put(":id", userController.updateUser)
router.delete("/:id",userController.deleteUser)
const userRouter = router;
export default userRouter;
