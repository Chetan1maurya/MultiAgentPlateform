import { checkAgentLimit } from "../config/agentLimit.js"
import { searchTool } from "../config/tavily.js"
import { deductCredits } from "../utils/deductCredits.js"

export const searchAgent = async(state) => {
    try{
        await checkAgentLimit(state.userId, "search")
        console.log("Search agent called")
         const results = await searchTool.invoke({
            query: state.prompt
         })
         console.log(results)
         await deductCredits(state.userId, "search")
         return {
            ...state, 
            searchResults: results,
            images: results.images
         }
    }catch(error){
        console.log(error)
        return {
            ...state, 
            aiResponse: error?.data?.message || "Failed to do search",
            searchResults: [],
            images: []
        }
    }
}