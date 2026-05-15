import { request } from "http";
import { pool } from "../../db";
import type { iUser } from "./user.interface";

const createUserDb = async(payload:iUser)=>{
    const { name, email, password } = payload;
    const result = await pool.query(
      `INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *`,
      [name, email, password],
    );
    return result;
}

const userService ={createUserDb}
export default userService;