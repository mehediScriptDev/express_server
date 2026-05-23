import type { Request, Response } from "express";
import profileServices from "./profile.services";

const profileController = async (req:Request, res:Response)=>{
    try {
        const result = await profileServices.createProfileIntoDb(req.body)
        res.status(201).json({
            success:true,
            message: "Profile created successfully",
            data: result
        })
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message: "data not found",
            error: error
        })
    }
}

const profilesController = {
    profileController
}
export default profilesController;