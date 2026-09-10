import { ChatGroq } from "@langchain/groq"
import { ChatGoogle } from "@langchain/google";
import { ChatOpenRouter } from "@langchain/openrouter";
import dotenv from 'dotenv'
dotenv.config()

const deepseek = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens: 2000
});

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
})

const gemini = new ChatGoogle({
    model: "gemini-3.7-flash"
})

export const getModel = async(agent) => {
    switch(agent){
        case "chat":
            return groq;
        case "search":
            return groq;
        case "coding":
            return deepseek;
            
        default: 
            return groq;
    }
}