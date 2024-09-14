"use client";
import Layers from "./layer/Layers";
import { ModeToggle } from "./ui/themeToggle";
import UploadImage from "./uploadImage";
import ActiveImage from "./ActiveImage";
import UploadImageForm from "./UploadImageForm";
import { useLayerStore } from "@/zustand/layerStore";
import ImageToolbar from "./toolbar/ImageToolbar";

export default function Editor() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  return (
    <div className="flex h-full">
      <div className="py-6 px-4  min-w-48 ">
        <div className="pb-12 text-center">
          <ModeToggle />
        </div>
          <div className="flex flex-col gap-4">
            {activeLayer.resourceType === "image" ? <ImageToolbar/> : null}
        </div>
      </div>
      <UploadImageForm />
      <ActiveImage />
      <Layers />
    </div>
  );
}
