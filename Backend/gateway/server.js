import express from 'express'
import dotenv from 'dotenv'
import proxy from 'express-http-proxy'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import protect from './middlewares/auth.middleware.js'
import { getMe } from './controllers/user.controller.js'
import { proxyWithHeader } from './utils/proxyWithHeader.js'
import morgan from 'morgan'

const PORT = process.env.PORT

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(morgan("dev"))

app.use(cookieParser())

app.use("/api/auth", proxy(process.env.AUTH_SERVICE))
app.use("/api/chat", protect, proxyWithHeader(process.env.CHAT_SERVICE))
app.use("/api/agent", protect, proxy(process.env.AGENT_SERVICE))
app.get("/api/get-me", protect, getMe)

app.get("/",(req,res) => {
    res.json({message: "Hello what is your problem"})
})

app.listen(PORT,() => {
    console.log(`Gateway started at ${PORT}`)
})                 
