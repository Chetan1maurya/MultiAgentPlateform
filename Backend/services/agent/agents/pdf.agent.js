import { checkAgentLimit } from "../config/agentLimit.js";
import { getModel } from "../config/llmModels.js";

import { createPdfTool } from "../tools/createPdf.tool.js";


export const pdfAgent = async (state) => {

    try {

        console.log("🤖 PDF Agent started");


        // ==========================================
        // 1. CHECK LIMIT
        // ==========================================

        await checkAgentLimit(state.userId, "pdf");


        // ==========================================
        // 2. GET MODEL
        // ==========================================

        const llm = await getModel("pdf");


        // ==========================================
        // 3. ALL PDF AGENT TOOLS
        // ==========================================

        const tools = [
            createPdfTool,
        ];


        // ==========================================
        // 4. BIND TOOLS TO LLM
        // ==========================================

        const llmWithTools = llm.bindTools(tools);


        // ==========================================
        // 5. SYSTEM MESSAGE
        // ==========================================

        const systemMessage = {
            role: "system",

            content: `
You are an autonomous professional PDF/document agent.

Your job is to understand the user's request and create a
high-quality document using the available PDF tools.

You decide the document architecture yourself.

Do NOT follow a fixed template.
Do NOT always create sections with bullet points.
Do NOT automatically turn every request into a Q&A document.

Choose the structure that best fits the user's request.

Depending on the topic, the document may contain:
- headings
- paragraphs
- bullet lists
- numbered lists
- code examples
- comparison tables
- examples
- important notes
- warnings
- summaries
- diagrams
- step-by-step explanations
- other supported content blocks

For technical topics, prefer a structure that actually helps
the reader understand the concept. For example, code examples,
tables, diagrams, explanations, and examples may be more useful
than a list of questions.

For comparison requests, a comparison table may be appropriate.

For tutorials, use a logical learning flow.

For reports, use a professional report structure.

For study material, organize the material according to the
subject rather than forcing everything into Q&A format.

The document structure, number of sections, ordering, and
content types are entirely your decision.

The content supplied to the PDF tool must be the actual content
that should appear in the PDF.

Do not generate PDFKit code.
Do not invent tool results.
Do not invent download URLs.

If the user's request requires a PDF, use the available PDF tool.

After using a tool, inspect its result.
If another tool is required, use it.
Continue until the user's request is completed.

Once the task is complete, provide a concise final response.
`
        };


        // ==========================================
        // 6. INITIAL MESSAGES
        // ==========================================

        let messages = [
            systemMessage,
            {
                role: "user",
                content: state.prompt
            }
        ];


        // ==========================================
        // 7. AGENT LOOP
        // ==========================================

        while (true) {

            console.log("🤖 Calling PDF LLM...");


            const response = await llmWithTools.invoke(messages);


            console.log("🤖 PDF LLM response:");
            console.log(response);

            console.log(
                "📄 GENERATED PDF TOOL ARGUMENTS:",
                JSON.stringify(response.tool_calls, null, 2)
            );
            // ======================================
            // NO TOOL CALL
            // ======================================

            if (!response.tool_calls || response.tool_calls.length === 0) {

                console.log("✅ PDF Agent finished");

                return {
                    ...state,

                    messages: [
                        ...(state.messages || []),
                        response
                    ],

                    aiResponse: response.content
                };
            }

            // ======================================
            // TOOL CALL(S)
            // ======================================

            console.log(
                "🔧 PDF Agent requested tools:",
                response.tool_calls
            );

            // Add AI response to conversation
            messages.push(response);

            // ======================================
            // EXECUTE EVERY REQUESTED TOOL
            // ======================================

            for (const toolCall of response.tool_calls) {

                console.log(
                    `🛠️ Executing tool: ${toolCall.name}`
                );


                const selectedTool = tools.find(
                    tool => tool.name === toolCall.name
                );


                if (!selectedTool) {

                    throw new Error(
                        `Tool "${toolCall.name}" not found`
                    );
                }


                // Execute tool
                const toolResult = await selectedTool.invoke(
                    toolCall.args
                );


                console.log(
                    `✅ ${toolCall.name} completed`
                );


                // ==================================
                // ADD TOOL RESULT BACK TO LLM
                // ==================================

                messages.push({

                    role: "tool",

                    content: JSON.stringify(toolResult),

                    tool_call_id: toolCall.id
                });
            }


            // ======================================
            // LOOP AGAIN
            // ======================================

            console.log(
                "🔄 Sending tool result back to PDF LLM..."
            );
        }


    } catch (error) {

        console.error(
            "❌ PDF Agent Error:",
            error
        );


        return {

            ...state,

            aiResponse:
                error?.data?.message ||
                error?.message ||
                "Failed to process PDF request"
        };
    }
};