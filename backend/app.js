import authRoutes from "./routes/auth.js";
import articleRoutes from './routes/articleRoutes.js'
import express from 'express';
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
connectDB();

const app = express();
const port = process.env.port;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

//Middleware to parse JSON request bodies
app.use(express.json());

//Mount auth routes
// All auth-related routes will start with /api/auth
app.use("/api/auth", authRoutes);

app.use("/api/article", articleRoutes );

app.get('/',(req,res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
