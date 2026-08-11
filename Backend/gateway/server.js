import express from 'express'
import dotenv from 'dotenv'
import proxy from 'express-http-proxy'
dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use("/auth", proxy(process.env.AUTH_SERVICE))

app.get("/",(req,res) => {
    res.json({message: "Hello what is your problem"})
})

app.listen(PORT,() => {
    console.log(`Gateway started at ${PORT}`)
})