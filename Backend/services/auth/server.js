import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config()

const PORT = process.env.PORT

const app = express()

app.get("/",(req,res) => {
    res.json({message: "Hello what is your problem in auth"})
})

app.listen(PORT,() => {
    console.log(`Auth Service started at ${PORT}`)
    connectDB()
})