import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { json } from "node:stream/consumers";
import { Pool } from "pg";
const app: Application = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(express.text());

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_Tyiu25FlaxLM@ep-young-wave-aqzkt3rc-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initdb = async () => {
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
  } catch (error) {
    console.log(error);
  }
};
initdb();
app.get("/api/users", async (req: Request, res: Response) => {
  const result = await pool.query(`
    SELECT * FROM users`);

  res
    .status(200)
    .json({ success: true, message: "data exists bro", data: result.rows });
});

app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
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
});

app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await pool.query(
      `INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *`,
      [name, email, password],
    );
    res.status(201).json({ data: result.rows[0] });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
});

app.put("/api/users/:id", async (req: Request,res:Response)=>{
  const {id} = req.params;
  const {name,email,password,is_active} = req.body;
  const result = await pool.query(`UPDATE users SET name=COALESCE($1,name), email=COALESCE($2,email), password=COALESCE($3,password), is_active=COALESCE($4,is_active) WHERE id=$5 RETURNING *`,[name,email,password,is_active,id])

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
})

app.delete("/api/users/:id",async(req:Request,res:Response)=>{
  const {id} = req.params;
  const result = await pool.query(`DELETE FROM users WHERE id=$1`,[id])
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
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
