import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "New Chat"
    },
    userId: {
        type: String
    }
},{
    timestamps: true
})

// conversationSchema.index({
//     userId: 1,
//     updatedAt: -1
// });

const Conversation = mongoose.model("Conversation", conversationSchema)
export default Conversation

