import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";
import redis from "../../../shared/redis/redis.js";


export const agent = async (req, res, next) => {
    try {
        const { prompt, conversationId, agent } = req.body;
        const file = req.file;
        const userId = req.headers["x-user-id"];

        console.log("========== CHAT REQUEST ==========");
        console.log("Agent:", agent);
        console.log("Prompt:", prompt);
        console.log("Conversation ID:", conversationId);
        console.log("User ID:", userId);
        console.log("File:", file);

        // --------------------------------------------------
        // 1. Save USER message to database
        // --------------------------------------------------

        console.log("Saving user message...");

        await axios.post(
            `${process.env.CHAT_SERVICE}/save-messages`,
            {
                conversationId,
                role: "user",
                content: prompt,
            }
        );

        console.log("User message saved");


        // --------------------------------------------------
        // 2. Update Redis memory
        // --------------------------------------------------
        // addMessage() should keep only latest 20 messages.
        // No redis.del() here.
        // No redis.get() -> MISS -> DB -> Redis cycle here.



        // --------------------------------------------------
        // 3. Run LangGraph
        // --------------------------------------------------

        console.log("========== CALLING GRAPH ==========");

        const result = await graph.invoke({
            prompt,
            conversationId,
            agent,
            userId,
            file,
        });

        console.log("========== GRAPH COMPLETED ==========");

        console.log(
            "Response Generated:",
            result.aiResponse
        );

        const response = result.aiResponse;


        // --------------------------------------------------
        // 4. Save ASSISTANT message to database
        // --------------------------------------------------

        console.log("Saving assistant message...");

        await axios.post(
            `${process.env.CHAT_SERVICE}/save-messages`,
            {
                conversationId,
                role: "assistant",
                content: response,
                images: result?.images,
                artifacts: result?.artifacts,
            }
        );

        console.log("Assistant message saved");


        // --------------------------------------------------
        // 5. Update Redis memory with assistant response
        // --------------------------------------------------

        console.log("Updating Redis memory with assistant response...");
        console.log("Updating Redis memory...");

        await addMessage(
            conversationId,
            "user",
            prompt
        );

        console.log("Redis memory updated");
        await addMessage(
            conversationId,
            "assistant",
            response
        );

        console.log("Redis memory updated");


        // --------------------------------------------------
        // 6. Send response to client
        // --------------------------------------------------

        console.log("========== CHAT SUCCESS ==========");

        return res.status(200).json({
            answer: response,
            images: result?.images,
            artifacts: result?.artifacts,
        });

    } catch (error) {

        console.error("========== CHAT ERROR ==========");
        console.error("message:", error.message);
        console.error("code:", error.code);
        console.error("syscall:", error.syscall);
        console.error("address:", error.address);
        console.error("port:", error.port);
        console.error("cause:", error.cause);

        if (error.config) {
            console.error("Axios URL:", error.config.url);
        }

        return res.status(500).json({
            message: "Chat failed",
            error: error.message,
        });
    }
};



