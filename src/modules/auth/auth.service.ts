import { error } from "node:console";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config";

const loginUserIntoDb =  async(payload:{email:string,password:string})=>{
const {email,password} = payload;

const userData = await pool.query(`
    SELECT * FROM users WHERE email=$1
    
    `,[email])
    if(userData.rows.length ===0){
        throw new Error("invalid credentials")
    }
     const user = userData.rows[0];

     const matchedPassword = await bcrypt.compare(password,user.password);
    if(!matchedPassword){
        throw new Error("invalid credentials")
    }
    
    const jwtPayload = {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "is_active": user.is_active

    }

    const token = jwt.sign(jwtPayload,config.secret as string,{expiresIn:"1d"})

return token;

   
}


const authServices={
    loginUserIntoDb
}
export default authServices;