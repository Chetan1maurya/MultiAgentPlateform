import express from 'express'
import dotenv from 'dotenv'
import router from './routes/agent.route.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.use("/", router)

app.use((err, req, res, next) => {
    console.log(err)
    if(err.status){
        return res.status(err.status).json(err.data)
    }
    return res.status(500).json({message: `agent error ${err}`})
})

app.get("/",(req,res) => {
    res.json({message: "Hello what is your problem in agent"})
})

app.listen(PORT,() => {
    console.log(`Agent Service started at ${PORT}`)
})