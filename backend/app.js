import authRoutes from "./routes/auth.js";
import articleRoutes from './routes/articleRoutes.js'
import express from 'express';

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
connectDB();

const app = express();
const port = process.env.port;


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
  console.log(`Example app listening on port ${port}`)
})
