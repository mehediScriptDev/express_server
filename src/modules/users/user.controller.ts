import type { Request, Response } from "express";
import { pool } from "../../db";
import userService from "./user.service";

const createUser = async (req: Request, res: Response) => {
    //  const { name, email, password } = req.body;
  try {
   
    const result = await userService.createUserDb(req.body)
    res.status(201).json({ data: result.rows[0] });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
}

const userController={
createUser
} 

export default userController;