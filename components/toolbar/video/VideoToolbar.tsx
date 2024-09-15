"use client"

import { useLayerStore } from "@/zustand/layerStore"
import VideoTranscription from "./VideoTranscription"
import AICrop from "./AICrop"

export default function VideoToolbar() {
  const activeLayer = useLayerStore((state) => state.activeLayer)
  if (activeLayer.resourceType === "video")
    return (
      <>
      <VideoTranscription />
      <AICrop />
      </>
    )
}