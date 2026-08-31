import { StateGraph } from "@langchain/langgraph"
import { agentState } from "./state.js"
import { router } from "./router.js"
import { chatAgent } from "../agents/chat.agent.js"
import { codingAgent } from "../agents/coding.agent.js"
import { pdfAgent } from "../agents/pdf.agent.js"
import { pptAgent } from "../agents/ppt.agent.js"
import { searchAgent } from "../agents/search.agent.js"

const workflow = new StateGraph(agentState)

workflow.addNode("router", router)
workflow.addNode("chat", chatAgent)
workflow.addNode("coding", codingAgent)
workflow.addNode("pdf", pdfAgent)
workflow.addNode("ppt", pptAgent)
workflow.addNode("search", searchAgent)

workflow.addEdge("__start__", "router")
workflow.addConditionalEdges("router",(state) => {
    switch(state.agent){
        case "chat":
            return "chat";
        case "search":
            return "search";
        case "coding":
            return "coding";
        case "pdf":
            return "pdf";
        case "ppt":
            return "ppt";
        default: 
            break;
    }
},{
    chat: "chat",
    search: "search",
    pdf: "pdf",
    ppt: "ppt",
    coding: "coding"
})

workflow.addEdge("search", "chat")
workflow.addEdge("chat","__end__")
workflow.addEdge("pdf", "__end__")
workflow.addEdge("ppt", "__end__")

export const graph = workflow.compile()