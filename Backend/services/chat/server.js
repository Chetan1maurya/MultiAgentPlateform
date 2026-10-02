import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './routes/chat.routes.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.use("/", router)

app.get("/",(req,res) => {
    res.json({message: "Hello what is your problem in chat"})
})
await connectDB()
app.listen(PORT,() => {
    console.log(`Chat Service started at ${PORT}`)
})