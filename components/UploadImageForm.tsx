'use client';

import { useLayerStore } from "@/zustand/layerStore";
import { useState } from "react";
import UploadImage from "./uploadImage";

export default function UploadImageForm(){

  const activeLayer = useLayerStore((state) => state.activeLayer);
  const [selectedType, setSelectedType] = useState('image');
  
  if(!activeLayer.url)
  return (
    <div className="w-full p-24 flex flex-col  justify-center  h-full">
      {
      selectedType === "image"? <UploadImage /> : null
    }
    </div>
  )
}