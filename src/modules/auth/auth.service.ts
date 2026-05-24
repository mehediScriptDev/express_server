import { error } from "node:console";
import { pool } from "../../db";

const loginUserIntoDb =  async(payload:{email:string,password:string})=>{
const {email,password} = payload;

const userData = await pool.query(`
    SELECT * FROM users WHERE email=$1
    
    `,[email])
    if(userData.rows.length ===0){
        throw new Error("invalid credentials")
    }
    const user = userData.rows[0];
}


const authServices={
    loginUserIntoDb
}
export default authServices;