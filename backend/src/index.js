import express from 'express';
import 	authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
const app=express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)
connectDB();

const PORT=process.env.PORT ||5001;

app.listen(5001,()=>{
	console.log(`Server is running on port ${PORT}` );
})