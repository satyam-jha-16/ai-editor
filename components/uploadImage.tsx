"use client";

import { uploadImage } from "@/server/uploadImage";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "./ui/card";

export default function UploadImage() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    onDrop: async (acceptedFiles, fileRejections) => {
      if (acceptedFiles.length > 0) {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0]);
        //create a url as soon as the image is uploaded to make visible to the user
        const objectUrl = URL.createObjectURL(acceptedFiles[0]);
        // STATE MANAGEMENT HERE
        const res = await uploadImage({ image: formData });
        console.log(res, objectUrl)
      }
    },
  });

  return (
    <Card {...getRootProps()} className={`border-2 border-dashed border-gray-300 p-6 m-6 text-center transition-colors duration-300 hover:border-gray-500 hover:animate-pulse ${isDragActive ? 'border-green-500 bg-green-100' : 'border-gray-300'}`}>
      <CardContent className="flex flex-col items-center">
        <input {...getInputProps()} className="hidden" type="text" />
        <div className={`p-10 border-2 border-dashed rounded-lg transition-colors duration-300 `}>

          <p className="text-2xl mb-4">
            {isDragActive
              ? "Drop your file here!"
              : "Start by uploading any file!"}
          </p>
          <p className="text-sm text-gray-500">Supported Formats are .png, .jpg, .jpeg, .webp</p>
        </div>
      </CardContent>
    </Card>
  );
}
