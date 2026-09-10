import { getModel } from "../config/llmModels.js"

export const pdfAgent = async(state) => {
    try{
        const llm = await getModel("pdf")
        const prompt = `You are an expert document writer. 
        Return ONLY valid JSON.
        Do NOT return markdown.
        Do NOT return explanations.
        Structure: 
        {
        "title":"",
        "subtitle":"",
        "section":[
        {
        "heading":"",
        "points":[]
        }
        ]
        }
        
        Generate 4-8 sections.
        Each section should have 3-6 concise bullet points.
        Topic: 
    ${state.prompt}
        `

        const res = llm.invoke(prompt)
        const data = JSON.parse(res.content)
        return {
            ...state,
            aiResponse: data
        }
    }catch(error){
        return {
            ...state,
            aiResponse: "Failed to generate pdf"
        }
    }
}