import express from 'express'
import dotenv from 'dotenv'
import router from './routes/agent.route.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.use("/", router)

app.get("/",(req,res) => {
    res.json({message: "Hello what is your problem in chat"})
})

app.listen(PORT,() => {
    console.log(`Agent Service started at ${PORT}`)
})