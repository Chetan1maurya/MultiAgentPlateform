import { getModel } from "../config/llmModels.js"
import { createPdfTool } from "../tools/createPdf.tool.js"
import { deductCredits } from "../utils/deductCredits.js"

import { generatePdf } from "../utils/generatePdf.js"
import { getFromS3 } from "../utils/getFromS3.js"
import { uploadToS3 } from "../utils/uploadToS3.js"

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

        const res = await llm.invoke(prompt)
        const data = JSON.parse(res.content)
        const pdfBuffer = await generatePdf(data)
        const filename = `pdf-${Date.now()}.pdf`

        await uploadToS3(filename, pdfBuffer, "application/pdf")
        const downloadUrl = await getFromS3(filename, 24 * 60)
        await deductCredits(state.userId, "pdf")
        return {
            ...state,
            aiResponse: `# Pdf Generation Successful
**${data.title}**
[Download URL](${downloadUrl})
Link expires in 24 hours`
        }
    }catch(error){
        console.log(error)
        return {
            ...state,
            aiResponse: "Failed to generate pdf"
        }
    }
//     console.log("PDf agent called")
//     const llm = await getModel("pdf");

//     const model = llm.bindTools([
//         createPdfTool
//     ]);

//     const response = await model.invoke([
//         {
//             role: "system",
//             content: `
// You are a PDF generation agent.

// Your job is to understand the user's request
// and decide what action is required.

// If the user wants an actual downloadable PDF,
// use the create_pdf tool.

// Do not manually generate the PDF.
// The create_pdf tool is responsible for generating,
// uploading and returning the PDF URL.

// If the user is only asking a question and does
// not require a PDF, answer normally.
// `
//         },

//         {
//             role: "user",
//             content: state.prompt
//         }
//     ]);

//     return {
//         ...state,
//         messages: [response]
//     };
}