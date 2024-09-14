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
  format : z.string(),
  activeImage : z.string(),
});

export const bgRemove = actionClient
  .schema(bgRemoveSchema)
  .action(async ({ parsedInput: { activeImage,format} }) => {
    const form = activeImage.split(format);
    const pngConvert = form[0] + "png";
    const parts = pngConvert.split('/upload/');
    const bgUrl = `${parts[0]}/upload/e_background_removal/${parts[1]}`;
    let isProcessed = false;
    const maxAttempts = 20;
    const delay = 1000;
    for (let attempt = 0; attempt < maxAttempts; attempt++){
      isProcessed = await checkImageProcessing(bgUrl);
      if (isProcessed) {
        break;
            }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    if (!isProcessed) {
      throw new Error("Image processing timed out");
        }
    console.log(bgUrl);
    return { success: bgUrl };
    
})