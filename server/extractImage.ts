"use server";

import checkImageProcessing from "@/lib/checkImageProcessing";
import { actionClient } from "@/lib/safeAction";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

cloudinary.config({
  cloud_name: "dberyjqrn",
  api_secret: process.env.CLOUDINARY_SECRET,
  api_key: process.env.CLOUDINARY_KEY,
});

const extractSchema = z.object({
  activeImage: z.string(),
  prompts: z.array(z.string()),
  multiple: z.boolean().optional(),
  mode: z.enum(["default", "mask"]).optional(),
  invert: z.boolean().optional(),
  format: z.string(),
});

export const extractImage = actionClient
  .schema(extractSchema)
  .action(
    async ({
      parsedInput: { activeImage, prompts, mode, multiple, invert, format },
    }) => {
      const form = activeImage.split(format);
      const pngConvert = form[0] + "png";
      const parts = pngConvert.split("/upload/");
      let isProcessed = false;
      const maxAttempts = 20;
      let extractParams = `prompt_(${prompts
        .map((p) => encodeURIComponent(p))
        .join(";")})`;
      if (multiple) extractParams += ";multiple_true";
      if (mode === "mask") extractParams += ";mode_mask";
      if (invert) extractParams += ";invert_true";

      const extractUrl = `${parts[0]}/upload/e_extract:${extractParams}/${parts[1]}`;

      const delay = 1000; // 1 second
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        isProcessed = await checkImageProcessing(extractUrl);
        if (isProcessed) {
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      if (!isProcessed) {
        throw new Error("Image processing timed out");
      }
      console.log(extractUrl);
      return { success: extractUrl };
    },
  );
