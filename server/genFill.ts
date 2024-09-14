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

const genFillSchema = z.object({
  activeImage : z.string(),
  aspect : z.string(),
  height : z.number(),
  width : z.number(),
});

export const genFill = actionClient
  .schema(genFillSchema)
  .action(async ({ parsedInput: { activeImage,aspect, height, width} }) => {
    const parts = activeImage.split("/upload/");
    const fileUrl = `${parts[0]}/upload/ar_${aspect},b_gen_fill,c_pad,w_${width},h_${height}/${parts[1]}`;
    let isProcessed = false;
    const maxAttempts = 20;
    const delay = 1000;
    for (let attempt = 0; attempt < maxAttempts; attempt++){
      isProcessed = await checkImageProcessing(fileUrl);
      if (isProcessed) {
        break;
            }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    if (!isProcessed) {
      throw new Error("Image processing timed out");
        }
    console.log(fileUrl);
    return { success: fileUrl};
    
})