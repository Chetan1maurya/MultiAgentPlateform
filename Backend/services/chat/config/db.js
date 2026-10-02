import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            maxPoolSize: 120
        })
        console.log("Db connected")
    } catch (error) {
        console.log(`DB Error, ${error}`)
    }
}

export default connectDB