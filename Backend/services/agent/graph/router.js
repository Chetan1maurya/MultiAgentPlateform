import { getModel } from "../config/llmModels.js"

export const router = async (state) => {
    if (state.agent && state.agent !== "auto") {
        return {
            ...state,
            agent: state.agent
        }
    }
    if (state.file) {
        if (state.file.mimetype === "application/pdf") {
            return {
                ...state,
                agent: "pdfRag"
            }
        }
        if (state.file.mimetype.startsWith("image/")) {
            return {
                ...state,
                agent: "imageAnalyzer"
            }
        }
    }

    const llm = await getModel("router")

    const prompt = `You are an agent router

    Available agents:
    - chat
    - search
    - coding
    - pdf
    - ppt
    - vision
    - imageAnalyzer
    - pdfRag
    
    Rules: 
    chat,
    general conversation,
    explanations,
    learning,
    questions.
    
    search:
    Current events,
    latest information,
    news,
    recent developments,
    internet lookup.
    
    coding: 
    Generate code,
    debug code,
    build projects,
    architecture,
    API design.
    
    pdf:
    Questions about generate PDFs
    or document context.
    
    ppt: 
    Questions about generate ppts
    or ppt context.

    vision: 
    Asking to generate images
    
    imageAnalyzer:
    Asking to analyze given image,
    Give insights from the image

    pdfRag: 
    Asking to analyze given pdf,
    Give insights from the file, 
    Given answers of the questions from the pdf given, not outside from it.

    Return ONLY one word:
    
    chat
    search
    coding
    pdf
    ppt
    vision
    imageAnalyzer
    pdfRag
    
    User query: 
      ${state.prompt}`

    const response = await llm.invoke(prompt)
    return {
        ...state,
        agent: response.content.trim().toLowerCase()
    }
}