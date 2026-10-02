import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentLimit.js";

// export const chatAgent = async (state) => {
//   console.log("Chat agent called");
//   try {
//     await checkAgentLimit(state.userId, "chat")
//     const llm = await getModel("chat");
//     const history = await getMemory(state.conversationId);
//     const searchContext = state.searchResults
//       ? `Web Search Results: 
// ${JSON.stringify(state.searchResults)}
// Answer the user using only the above search results.
// `
//       : "";

//     const systemPrompt = `You are CortexAI, an intelligent AI asistant.
// ${searchContext}
//     if searchContext exists: 
//     - Use search results to answer.
//     - Do not mention internal tools.

//     Rules:
//     - For simple questions, greetings, and short MediaQueryListEvent, respond naturally in plain text.
//     - For technical, educational, coding, or detailed WebTransportBidirectionalStream, use clean Markdown.

//     Formatting:
//     - Use # for titles and ## for sections.
//     - Leave a blank line after headings.
//     - Use bullet points for lists.
//     - Use numbered lists for steps.
//     - Use fenced code blocks with language tags for code.
//     - Keep paragraphs short and readable.
//     - Never write headings and content on the same line.
//     - Never generate large walls of text.
//      `;
//     const messages = [new SystemMessage(systemPrompt)];

//     history.forEach((msg, index) => {
//       console.log("========== HISTORY MESSAGE ==========");
//       console.log("Index:", index);
//       console.log("Role:", msg?.role);
//       console.log("Content:", msg?.content);
//       console.log("Full message:", msg);

//       if (msg?.role === "user") {
//         messages.push(new HumanMessage({
//           content: msg.content
//         }));
//       }

//       if (msg?.role === "assistant") {
//         messages.push(new AIMessage({
//     content: msg.content
// }));
//       }
//     });
//     messages.push(new HumanMessage(state.prompt));
//     console.log(messages);
//     const response = await llm.invoke(messages);
//     console.log(response.content);
//     await deductCredits(state.userId, "chat")
//     return {
//       ...state,
//       aiResponse: response.content,
//     };
//   } catch (error) {
//     console.error("========== CHAT AGENT ERROR ==========");
//     console.error("Message:", error.message);
//     console.error("Stack:", error.stack);
//     console.error("Full error:", error);

//     return {
//       ...state,
//       aiResponse: error.message || "Failed to continue chat"
//     };
//   }
// };



export const chatAgent = async (state) => {
    console.log("========== CHAT AGENT START ==========");

    try {

        // 1. Check agent limit
        let start = performance.now();

        await checkAgentLimit(state.userId, "chat");

        console.log(
            "⏱️ checkAgentLimit:",
            (performance.now() - start).toFixed(2),
            "ms"
        );


        // 2. Get model
        start = performance.now();

        const llm = await getModel("chat");

        console.log(
            "⏱️ getModel:",
            (performance.now() - start).toFixed(2),
            "ms"
        );


        // 3. Get memory
        start = performance.now();

        const history = await getMemory(state.conversationId);

        console.log(
            "⏱️ getMemory:",
            (performance.now() - start).toFixed(2),
            "ms"
        );


        // 4. Build messages
        start = performance.now();

        const searchContext = state.searchResults
            ? `Web Search Results:
${JSON.stringify(state.searchResults)}

Answer the user using only the above search results.
`
            : "";

        const systemPrompt = `You are CortexAI, an intelligent AI assistant.

${searchContext}

Rules:
- For simple questions, greetings, and short messages, respond naturally in plain text.
- For technical, educational, coding, or detailed questions, use clean Markdown.
- Use # for titles and ## for sections.
- Leave a blank line after headings.
- Use bullet points for lists.
- Use numbered lists for steps.
- Use fenced code blocks with language tags for code.
- Keep paragraphs short and readable.
- Never write headings and content on the same line.
- Never generate large walls of text.
`;

        const messages = [
            new SystemMessage(systemPrompt)
        ];

        history.forEach((msg) => {

            if (msg?.role === "user") {
                messages.push(
                    new HumanMessage({
                        content: msg.content
                    })
                );
            }

            if (msg?.role === "assistant") {
                messages.push(
                    new AIMessage({
                        content: msg.content
                    })
                );
            }

        });

        messages.push(
            new HumanMessage({
                content: state.prompt
            })
        );

        console.log(
            "⏱️ Build messages:",
            (performance.now() - start).toFixed(2),
            "ms"
        );


        // 5. LLM
        start = performance.now();

        const response = await llm.invoke(messages);

        console.log(
            "⏱️ LLM:",
            (performance.now() - start).toFixed(2),
            "ms"
        );


        // 6. Deduct credits
        start = performance.now();

        await deductCredits(state.userId, "chat");

        console.log(
            "⏱️ deductCredits:",
            (performance.now() - start).toFixed(2),
            "ms"
        );


        console.log("========== CHAT AGENT END ==========");

        return {
            ...state,
            aiResponse: response.content,
        };

    } catch (error) {

        console.error("========== CHAT AGENT ERROR ==========");
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);

        return {
            ...state,
            aiResponse: error.message || "Failed to continue chat"
        };
    }
};