import { getModel } from "../config/llmModels.js"
import { deductCredits } from "../utils/deductCredits.js"
import { generatePpt } from "../utils/generatePpt.js"
import { getFromS3 } from "../utils/getFromS3.js"
import { uploadToS3 } from "../utils/uploadToS3.js"

export const pptAgent = async(state) => {
    try{
        const llm = await getModel("ppt")
        const prompt = `You are a professional presentation designer.
        
        Format: 
        
        {
        "title":"",
        "subtitle":"",
        "slides":[
        {
            "title":"",
            "points":[
                "",
                "",
                "",
                ""
            ]
        }
        ]
        }
        
        Rules:
        - Generate exactly 6 content slides.
        - Each slide should have 4-6 consise bullet points.
        - No markdown.
        - No explanation.
        - No coode block.
        - Return ONLY JSON.

        Topic:
        ${state.prompt}
        `

        const res = await llm.invoke(prompt)
        const data = JSON.parse(res.content)
        const ppt = await generatePpt(data)
        await deductCredits(state.userId, "ppt")
        const buffer = await ppt.write({
            outputType: "nodebuffer"
        })
        const fileName = `ppt-${Date.now()}.pptx`
        await uploadToS3(fileName,buffer,"application/vnd.openxmlformats-officedocument.presentationml.presentation")
        const downloadUrl = await getFromS3(fileName,24*60)
        return {
            ...state,
            aiResponse: `# Presentation Generated
**${data.title}**
[Download PPT](${downloadUrl})
_Link expires in 10 minutes._`
        }

    }catch(error){
        console.log(error)
        return{
            ...state,
            aiResponse: "Failed to generate ppt"
        }
    }
}