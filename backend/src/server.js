import express from 'express'
import "dotenv/config";
import connectDB from './configs/db.js';

// Initialize Express App
const app = express()

// Connect Database
await connectDB()

app.get('/', (req, res)=> res.send("Server is running"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))
