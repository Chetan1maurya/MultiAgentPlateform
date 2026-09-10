import { searchTool } from "../config/tavily.js"

export const searchAgent = async(state) => {
    try{
        console.log("Search agent called")
         const results = await searchTool.invoke({
            query: state.prompt
         })
         console.log(results)
         return {
            ...state, 
            searchResults: results,
            images: results.images
         }
    }catch(error){
        console.log(error)
        return {
            ...state, 
            searchResults: [],
            images: []
        }
    }
}