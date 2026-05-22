import { get, request } from "http";
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
const getUser = async ()=>{
  const result = await pool.query(`
    SELECT * FROM users`);
    return result;
}
const getUserDetailss = async (id:string)=>{
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
  return result;
}
const userService ={createUserDb,getUser,getUserDetailss}
export default userService;