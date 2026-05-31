import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import userService from "./user.service";

const createUser = async (req: Request, res: Response) => {
    //  const { name, email, password } = req.body;
  try {
    const result = await userService.createUserDb(req.body)
    const user = result.rows[0];

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        is_active: user.is_active,
      },
      config.secret as string,
      { expiresIn: "1d" },
    );

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: {
        user,
        token,
      },
    });
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
const updateUser = async (req: Request,res:Response)=>{
  const {id} = req.params;
  const {name,email,password,is_active} = req.body;
  const result = await userService.updateUser(req.body,id as string)

try {
  if(result.rows.length === 0){
    res.status(404).json({success:true,
    message:"No data find here man",
    data: {}
  })
  }
  res.status(200).json({success:true,
    message:"Data updated successfully",
    data: result.rows[0]
  })
} catch (error) {
  res.status(404).json({success:false,
    message:"failed",
    data: {}
  })
}
}
const deleteUser = async(req:Request,res:Response)=>{
  const {id} = req.params;
  
  try {
    const result = await userService.deleteUser(id as string)
  if(result.rows.length === 0){
    res.status(404).json({success:true,
    message:"No data find here man",
    data: {}
  })
  }
  res.status(200).json({success:true,
    message:"Data deleted successfully",
    data: {message:"deleted man. happy now?"}
  })
} catch (error) {
  res.status(404).json({success:false,
    message:"failed",
    data: {}
  })
}
}
const userController={
createUser,
getUser,
getUserDetails,updateUser,deleteUser
} 

export default userController;