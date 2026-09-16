import axios from "axios"
import { graph } from "../graph/graph.js"
import { addMessage } from "../config/memory.js"
import redis from "../../../shared/redis/redis.js"

export const agent = async(req,res,next) => {
    try{
        const { prompt, conversationId, agent } = req.body
        const file = req.file
        console.log(agent)
        const userId = req.headers["x-user-id"]
        await redis.del(`messages-${conversationId}`)
        await axios.post(`${process.env.CHAT_SERVICE}/save-messages`,{
            conversationId, role:"user", content:prompt
        })
        const result = await graph.invoke({
            prompt, conversationId, agent, userId, file
        })
        console.log("Response Generated ",result.aiResponse)
        const response = result.aiResponse
        await addMessage(conversationId, "user", prompt)
        await addMessage(conversationId, "assistant", response)
        await axios.post(`${process.env.CHAT_SERVICE}/save-messages`,{
            conversationId, role:"assistant", content:response, images: result?.images, artifacts: result?.artifacts
        })
        return res.status(200).json({answer: result?.aiResponse, images: result?.images, artifacts: result?.artifacts})
    }catch(error){
        next(error)
    }
}

