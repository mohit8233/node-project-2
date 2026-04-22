import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { connectDb } from './config/db.js';
import { studentRouter } from './routes/studentRoutes.js';



const app = express();
app.use(express.json());
app.use(cors());

dotenv.config()

await connectDb()

app.use("/api/students", studentRouter);
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
    
})


