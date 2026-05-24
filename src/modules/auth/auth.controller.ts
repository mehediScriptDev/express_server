import type { Request, Response } from "express";
import { log } from "node:console";
import authServices from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUserIntoDb(req.body);
    res.status(201).json({
      message: "logged in successfully",
      data: {},
    });
  } catch (error:any) {
    res.status(404).json({ success: false, message: "failed", data: {} });
  }
};

const authController = {
  loginUser
}
export default authController;