'use server';

import { actionClient } from "@/lib/safeAction";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import checkImageProcessing from "@/lib/checkImageProcessing";

cloudinary.config({
  cloud_name:"dberyjqrn",
  api_secret: process.env.CLOUDINARY_SECRET,
  api_key: process.env.CLOUDINARY_KEY,
});

const bgRemoveSchema = z.object({
  prompt : z.string(),
  activeImage : z.string(),
});

export const bgReplace = actionClient
  .schema(bgRemoveSchema)
  .action(async ({ parsedInput: { activeImage,prompt} }) => {
    const parts = activeImage.split('/upload/');
    const bgReplaceUrl = prompt ? `${parts[0]}/upload/e_gen_background_replace:prompt_${prompt}/${parts[1]}` : `${parts[0]}/upload/e_gen_background_replace/${parts[1]}`
    let isProcessed = false;
    const maxAttempts = 20;
    const delay = 1000;
    for (let attempt = 0; attempt < maxAttempts; attempt++){
      isProcessed = await checkImageProcessing(bgReplaceUrl);
      if (isProcessed) {
        break;
            }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    if (!isProcessed) {
      throw new Error("Image processing timed out");
        }
    // console.log(bgReplaceUrl);
    return { success: bgReplaceUrl };
    
})