import type { Request, Response } from "express";
import authServices from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const token = await authServices.loginUserIntoDb(req.body);
    res.status(201).json({
      success: true,
      message: "logged in successfully",
      data: { token },
    });
  } catch (error:any) {
    res.status(404).json({ success: false, message: error.message || "failed", data: {} });
  }
};

const authController = {
  loginUser
}
export default authController;