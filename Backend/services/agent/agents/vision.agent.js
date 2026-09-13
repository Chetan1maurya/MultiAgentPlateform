import axios from "axios";
import { getModel } from "../config/llmModels.js";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFromS3 } from "../utils/getFromS3.js";
import { deductCredits } from "../utils/deductCredits.js";

export const visionAgent = async (state) => {
  try {
    const llm = await getModel("image");
    const res = await llm.invoke(`
        You are an elite AI image prompt engineer. 
        Conver the user re quest into a highly detailed image generation prompt.
        Requirements: 
        - Cinematic lighting
        - Professional composition
        - Ultra realistic
        - High detail
        - Beautiful color palette
        - Sharp focus
        - 8k quality
        - Photorealistic
        - Depth of field
        - Professional photography
        - Stunning visuals
        
        Return only the image prompt.
        User request:
         ${state.prompt}
        `);

    const prompt = res.content.trim();
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    const imageRes = await axios.get(imageUrl, { responseType: "arraybuffer" });
    await deductCredits(state.userId, "vision")
    console.log(imageRes)
    const buffer = Buffer.from(imageRes.data);
    const filename = `image-${Date.now()}.png`;
    await uploadToS3(filename, buffer, "image/png");
    const downloadUrl = await getFromS3(filename, 24 * 60);
    console.log(downloadUrl)
    return {
      ...state,
      aiResponse: `# Image Generated Successfully 
![Generated Image](${downloadUrl}) 
[Download Image](${downloadUrl}) 
Link expires in 24 hours.`
    }
  } catch (error) {
    return {
      ...state,
      aiResponse: "Failed to generate image",
    };
  }
};
