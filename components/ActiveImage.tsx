import { cn } from "@/lib/utils";
import { useImageStore } from "@/zustand/imageStore";
import { Layer, useLayerStore } from "@/zustand/layerStore";
import Image from "next/image";
import ImageComparison from "./layer/ImageComparison";
import { motion } from 'framer-motion';

export default function ActiveImage (){
  const generating = useImageStore((state) => state.generating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const layers = useLayerStore((state) => state.layers);
  const layerComparisonMode = useLayerStore((state) => state.layerComparisonMode);
  const comparedLayers = useLayerStore((state) => state.comparedLayers);
  
  
  if (!activeLayer.url && comparedLayers.length == 0) return null;
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
  
  if(layerComparisonMode && comparedLayers.length > 0){
    const comparisonLayers = comparedLayers
          .map((id) => layers.find((l) => l.id === id))
          .filter(Boolean) as Layer[]

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full relative h-svh p-24 bg-secondary flex flex-col items-center justify-center"
      >
        <ImageComparison layers={comparisonLayers} />
      </motion.div>
    );
  }
  
  return (
    <div className = 'w-full relative h-svh p-24 bg-secondary flex flex-col items-center justify-center'>
      {renderedLayer(activeLayer)}
    </div>
  )
}