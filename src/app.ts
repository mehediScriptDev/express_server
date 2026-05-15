import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import {  pool } from "./db";
import userRouter from "./modules/users/user.route";
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.text());



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

app.use("/api/users", userRouter)

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
    data: {message:"hello"}
  })
} catch (error) {
  res.status(404).json({success:false,
    message:"failed",
    data: {}
  })
}
})

export default app;
