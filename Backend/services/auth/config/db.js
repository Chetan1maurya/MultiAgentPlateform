import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 120,
            monitorCommands: true,
        })
        mongoose.connection.getClient().on("commandStarted", (event) => {
            if (event.commandName === "findAndModify") {
                console.log("Mongo command START:", event.commandName);
            }
        });

        mongoose.connection.getClient().on("commandSucceeded", (event) => {
            if (event.commandName === "findAndModify") {
                console.log(
                    "Mongo command SUCCESS:",
                    event.duration,
                    "ms"
                );
            }
        });
        console.log("Db connected")
    } catch (error) {
        console.log(`DB Error, ${error}`)
    }
}


export default connectDB