import { cn } from "@/lib/utils";
import { useImageStore } from "@/zustand/imageStore";
import { Layer, useLayerStore } from "@/zustand/layerStore";
import Image from "next/image";

export default function ActiveImage (){
  const generating = useImageStore((state) => state.generating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const layers = useLayerStore((state) => state.layers);
  
  
  if (!activeLayer.url) return null;
  const renderedLayer = (layer : Layer) => (
    <div className="relative w-full h-full flex items-center justify-center">
      {
      layer.resourceType === "image" && (
        <Image
          src={layer.url!}
          alt={layer.name!}
          fill={true}
          // height={layer.height}
          // width={layer.width}
          className={cn("rounded-lg object-contain",
            generating ? "animate-pulse" : "")}
          />
      )
    }
    
      {
      layer.resourceType === "video" && (
        <video
          src={layer.transcriptionURL || layer.url}
          controls
          height={layer.height}
          width={layer.width}
          className={cn("rounded-lg object-contain",
            generating ? "animate-pulse" : "")}
          />
      )
    }
    </div>
  )
  
  return (
    <div className = 'w-full relative h-svh p-24 bg-secondary flex flex-col items-center justify-center'>
      {renderedLayer(activeLayer)}
    </div>
  )
}