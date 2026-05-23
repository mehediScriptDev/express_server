
import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString:
    config.connection_string
});

export const initdb = async () => {
  try {
    await pool.query(`
      
      CREATE TABLE IF NOT EXISTS userS(
      id SERIAL PRIMARY KEY,
      name VARCHAR(15),
      email VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      age INT,
      is_active BOOLEAN DEFAULT true,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()

      
    )`);
    console.log("connected your first database man!!");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles(
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE ,
      bio TEXT,
      address TEXT,
      phone VARCHAR(15),
      email VARCHAR(255),
      gender VARCHAR(10),
      
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )

      `)
  } catch (error) {
    console.log(error);
  }
};