import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import userService from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserDb(req.body);
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

    return res.status(200).json({
      success: true,
      message: "user created successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();

    return res
      .status(200)
      .json({ success: true, message: "data exists bro", data: result.rows });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getUserDetailss(id as string);
    
    if (result.rows.length === 0) {
      // FIX: Added 'return' to stop execution
      return res.status(404).json({
        success: false,
        message: "not found this data man",
        data: {},
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "got this bro",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, is_active } = req.body;

  try {
    // FIX: Moved database call inside try block for safety
    const result = await userService.updateUser(req.body, id as string);

    if (result.rows.length === 0) {
      // FIX: Added 'return' to stop execution
      return res.status(404).json({
        success: true,
        message: "No data find here man",
        data: {},
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "failed",
      data: {},
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userService.deleteUser(id as string);
    
    if (result.rows.length === 0) {
      // FIX: Added 'return' to stop execution
      return res.status(404).json({
        success: true,
        message: "No data find here man",
        data: {},
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: { message: "deleted man. happy now?" },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "failed",
      data: {},
    });
  }
};

const userController = {
  createUser,
  getUser,
  getUserDetails,
  updateUser,
  deleteUser,
};

export default userController;