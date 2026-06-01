import { pool } from "../../db";

const createProfileIntoDb = async (payload: any) => {
  const { user_id, bio, address, phone, email, gender } = payload;

  const result = await pool.query(
    `INSERT INTO profiles(user_id, bio, address, phone, email, gender)
     VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [user_id, bio, address, phone, email, gender]
  );

  if (result.rows.length === 0) {
    throw new Error("Failed to create profile");
  }

  return result.rows[0];
};

const profileServices = {
  createProfileIntoDb,
};

export default profileServices;