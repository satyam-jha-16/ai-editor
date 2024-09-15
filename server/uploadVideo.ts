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
    error: string;
    success?: never;
  };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_SECRET,
  api_key: process.env.CLOUDINARY_KEY,
});

const formData = z.object({
  video: z.instanceof(FormData),
});

export const uploadVideo = actionClient
  .schema(formData)
  .action(async ({ parsedInput: { video } }) : Promise<UploadResponse> => {
    const formVideo = video.get("video");
    if (!formVideo) {
      return { error: "no video was provided" };
    }
    if (!video) {
      return { error: "no video was provided" };
    }
    const file = formVideo as File;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise<UploadResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type : "video",
            upload_preset: process.env.CLOUDINARY_PRESET,
            use_filename: true,
            unique_filename: false,
            filename_override: file.name,
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
    } catch (error ) {
      return { error: "Error processing file" };
    }
  });
