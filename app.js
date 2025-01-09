// const express = require('express')
// const app = express()
// const cors = require('cors');
// // app.use(cors());
// const mongoose  = require('mongoose')
// const {MONGOURI} = require('./config/keys')
// const PORT = process.env.PORT || 5000
// //
// const corsOptions = {
//     origin: "http://localhost:5173", // Allow requests from the specified origin
//     methods: ['GET', 'POST', 'PUT'], // Allow only specified HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specified headers
//     // credentials: true, 
// };
// app.use(cors(corsOptions));
// mongoose.connect(MONGOURI,{
//     useNewUrlParser:true,
//     useUnifiedTopology: true

// })

// mongoose.connection.on('connected',()=>{
//     console.log("conneted to mongo yeahh")
// })
// mongoose.connection.on('error',(err)=>{
//     console.log("err connecting",err)
// })

// require('./models/user')

// app.use(express.json())
// app.use(require('./routes/auth'))

// app.listen(PORT,()=>{
//     console.log("server is running on",PORT)
// })


import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import locationRoutes from './routes/location.js';
import postRoutes from './routes/post.js';
import flagRoutes from './routes/flag.js';
import eventRoutes from './routes/event.js';
import recommendationRoutes from './routes/recommendation.js';
import dotenv from 'dotenv';
import trainRoutes from './routes/train.js';
dotenv.config();

// Load environment variables


const app = express();

// Middleware
app.use(json()); // Parse JSON payloads
app.use(cors());         // Enable CORS

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/locations', locationRoutes);
app.use('/posts', postRoutes);
app.use('/flags', flagRoutes);
app.use('/events', eventRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/train', trainRoutes);
// Database Connection
connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection failed:', error));

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Traveler Social Media API');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
