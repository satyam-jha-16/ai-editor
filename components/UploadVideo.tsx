"use client";

import uploadAnimation from "@/public/animations/video-upload.json";
import { uploadVideo } from "@/server/uploadVideo";
import { useImageStore } from "@/zustand/imageStore";
import { useLayerStore } from "@/zustand/layerStore";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "./ui/card";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export default function UploadVideo() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const updateLayer = useLayerStore((state) => state.updateLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "video/mp4": [".mp4", ".MP4"],
      "video/webm": [".webm", ".WEBM"],
      "video/mov": [".mov", ".MOV"],
      "video/avi": [".avi", ".AVI"],
      "video/ts": [".ts", ".ts"],
    },
    onDrop: async (acceptedFiles, fileRejections) => {
      if (acceptedFiles.length > 0) {
        const formData = new FormData();
        formData.append("video", acceptedFiles[0]);

        setGenerating(true);
        // update the active layer with the new image

        setActiveLayer(activeLayer.id);
        // STATE MANAGEMENT HERE
        const res = await uploadVideo({ video: formData });

        if (res?.data?.success) {
          const videoUrl = res.data.success.secure_url;
          const thumbnailUrl = videoUrl.replace(/\.[^/.]+$/, ".jpg");
          console.log(thumbnailUrl)
          updateLayer({
            id: activeLayer.id,
            url: res.data.success.secure_url,
            width: res.data.success.width,
            height: res.data.success.height,
            name: res.data.success.display_name || res.data.success.public_id,
            publicId: res.data.success.public_id,
            format: res.data.success.format,
            poster: thumbnailUrl,
            resourceType: res.data.success.resource_type,
          });
          setActiveLayer(activeLayer.id);
          setGenerating(false);
          console.log(res.data.success);
        }
        if (res?.data?.error) {
          console.log(res.data.error);
          setGenerating(false);
        }
      }
    },
  });
  if (!activeLayer.url)
    return (
      <Card
        {...getRootProps()}
        className={`border-2 border-dashed border-gray-300 p-6 m-6 text-center transition-colors duration-300 hover:border-gray-100 ${isDragActive ? "border-green-200 dark:border-green-300 bg-green-50" : "border-gray-300"}`}
      >
        <CardContent className="flex flex-col items-center justify-center">
          <input {...getInputProps()} className="hidden" type="file" />
          <div
            className={`p-10 border-2 border-dashed rounded-lg transition-colors duration-300 flex flex-col items-center justify-center `}
          >
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
            <p className="text-sm text-gray-500">
              Supported Formats are .mp4, .avi, .mov
            </p>
          </div>
        </CardContent>
      </Card>
    );
}
