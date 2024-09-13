"use server";

import { actionClient } from "@/lib/safeAction";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import z from "zod";

type UploadResponse =
  | {
    success: UploadApiResponse;
    error?: never;
  }
  | {
    success?: never;
    error: string;
  };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_SECRET,
  api_key: process.env.CLOUDINARY_KEY,
});

const formData = z.object({
  image: z.instanceof(FormData),
});

export const uploadImage = actionClient
  .schema(formData)
  .action(async ({ parsedInput: { image } }) => {
    const formImage = image.get("image");
    if (!formImage) {
      return { error: "no image was provided" };
    }
    if (!image) {
      return { error: "no image was provided" };
    }
    const file = formImage as File;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise<UploadResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            upload_preset: process.env.CLOUDINARY_PRESET,
          },
          (error, result) => {
            if (error || !result) {
              reject({ error: "Upload Failed" });
            } else {
              resolve({ success: result });
            }
          },
        );
        uploadStream.end(buffer);
      });
    } catch (error) {
      return { error: error };
    }
  });
