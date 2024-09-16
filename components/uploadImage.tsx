"use client";

import uploadAnimation from "@/public/animations/image-upload.json";
import { uploadImage } from "@/server/uploadImage";
import { useImageStore } from "@/zustand/imageStore";
import { useLayerStore } from "@/zustand/layerStore";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "./ui/card";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export default function UploadImage() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const updateLayer = useLayerStore((state) => state.updateLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
      "image/avif": [".avif"]
    },
    onDrop: async (acceptedFiles, fileRejections) => {
      if (acceptedFiles.length > 0) {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0]);
        //create a url as soon as the image is uploaded to make visible to the user
        const objectUrl = URL.createObjectURL(acceptedFiles[0]);
        setGenerating(true);
        // update the active layer with the new image
        updateLayer({
          id: activeLayer.id,
          url: objectUrl,
          name: "uploading",
          height: 0,
          width: 0,
          publicId: "",
          format: "",
          resourceType: "image",
        });

        setActiveLayer(activeLayer.id);
        // STATE MANAGEMENT HERE
        const res = await uploadImage({ image: formData });

        if (res?.data?.success) {
          updateLayer({
            id: activeLayer.id,
            url: res.data.success.secure_url,
            name: res.data.success.display_name || res.data.success.original_filename,
            height: res.data.success.height,
            width: res.data.success.width,
            publicId: res.data.success.public_id,
            format: res.data.success.format,
            resourceType: res.data.success.resource_type,
          });
          setActiveLayer(activeLayer.id);
          setGenerating(false);
          console.log(res.data.success)
        }
        if (res?.data?.error) {
          console.log(res.data.error)
          setGenerating(false);
        }
      }
    },
  });
  if (!activeLayer.url)
    return (
      <Card {...getRootProps()} className={`border-2 border-dashed border-gray-300 p-6 m-6 text-center transition-colors duration-300 hover:border-gray-100 ${isDragActive ? 'border-green-200 dark:border-green-300 bg-green-50' : 'border-gray-300'}`}>
        <CardContent className="flex flex-col items-center justify-center">
          <input {...getInputProps()} className="hidden" type="file" />
          <div className={`p-10 border-2 border-dashed rounded-lg transition-colors duration-300 flex flex-col items-center justify-center `}>
            <Lottie
              animationData={uploadAnimation}
              loop
              autoplay
              style={{ width: "100px", height: "100px" }}
            />
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
