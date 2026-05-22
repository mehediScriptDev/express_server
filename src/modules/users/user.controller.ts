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
const getUser = async (req: Request, res: Response) => {
  const result = await userService.getUser();

  res
    .status(200)
    .json({ success: true, message: "data exists bro", data: result.rows });
}
const getUserDetails = async (req:Request,res: Response)=>{
  
  const { id } = req.params;
  try {
    const result = await userService.getUserDetailss(id as string)
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "not found this data man",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "got this bro",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }

}


const userController={
createUser,
getUser,
getUserDetails
} 

export default userController;