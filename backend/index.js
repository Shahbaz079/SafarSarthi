//importing packages
import path from "path"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import http from 'http';
import uploadRoutes from "./routes/uploadRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import payUploadRoutes from "./routes/payUploadRoutes.js"
import cors from 'cors'
//import utils


import connectDB from "./config/db.js"

dotenv.config();
const port=process.env.PORT||10000;
const HOST = process.env.HOST || '0.0.0.0';

connectDB()

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',userRoutes
); 

app.use('/api/category',categoryRoutes)
app.use("/api/products",productRoutes)
app.use("/api/upload",uploadRoutes);
app.use("/api/orders",orderRoutes)
app.use("/api/payupload",payUploadRoutes);


app.use('/api/config/paypal',(req,res)=>{
  res.send({clientId:process.env.PAYPAL_CLIENT_ID})
})

const __dirname=path.resolve();
app.use("/uploads",express.static(path.join(__dirname+"/uploads")));
app.use("/payUploads",express.static(path.join(__dirname+"/payuploads")));

const server = http.createServer(app);
server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; // 120 seconds


app.listen(port,HOST,console.log(`Server running on port:${port},host:${HOST}`));