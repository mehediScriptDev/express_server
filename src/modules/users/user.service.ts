import bcrypt from "bcrypt";
import { pool } from "../../db";
import type { iUser } from "./user.interface";

const createUserDb = async(payload:iUser)=>{
    const { name, email, password } = payload;
    const hashpassword = await bcrypt.hash(password, 12);
    const result = await pool.query(
      `INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *`,
      [name, email, hashpassword],
    );
    delete result.rows[0].password;
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
const updateUser = async(payload:iUser, id:string)=>{
  const {name,email,password,is_active} = payload;
  const result = await pool.query(`UPDATE users SET name=COALESCE($1,name), email=COALESCE($2,email), password=COALESCE($3,password), is_active=COALESCE($4,is_active) WHERE id=$5 RETURNING *`,[name,email,password,is_active,id])
  return result;
}
const deleteUser = async(id:string)=>{
  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`,[id])
  return result;
}
const userService ={createUserDb,getUser,getUserDetailss,updateUser,deleteUser}
export default userService;