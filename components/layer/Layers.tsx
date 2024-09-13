"use client";

import { cn } from "@/lib/utils";
import { useImageStore } from "@/zustand/imageStore";
import { useLayerStore } from "@/zustand/layerStore";
import { Layers2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import LayerComp from "./LayerComp";
import LayerInfo from "./LayerInfo";

export default function Layers() {
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const generating = useImageStore((state) => state.generating);

  return (
    <Card className="basis-[320px] shrink-0  scrollbar-thin scrollbar-track-secondary overflow-y-scroll scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-hidden relative flex flex-col shadow-2xl">
      <CardHeader className="sticky top-0 z-50 px-4 py-6  min-h-28 bg-card shadow-sm">
        <div>
          <CardTitle className="text-sm pb-2">
            {activeLayer.name || "Layers"}
          </CardTitle>
        </div>
        {activeLayer.height && activeLayer.width ? (
          <CardDescription>
            {activeLayer.width} x {activeLayer.height}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {layers.map((layer, i) => (
          <div
            key={layer.id}
            className={cn(
              "cursor-pointer ease-in-out hover:bg-secondary border border-transparent",
              {
                "animate-pulse": generating,
                "border-primary" : activeLayer.id === layer.id,
              },
            )}
            onClick={() => {
              if (generating) return;
              setActiveLayer(layer.id)
            }}
          >
            <div className="relative p-4 flex items-center">
              <div className="flex gap-2 items-center h-8 w-full justify-between">
                {!layer.url ? (
                  <p className="text-xs font-medium justify-self-end">
                    New Layer{" "}
                  </p>
                ) : null}
                <LayerComp layer={layer} />
                <LayerInfo layer={layer} layerIndex={i} />
              </div>
            </div>{" "}
          </div>
        ))}
      </CardContent>
      <div>
        <Button
          className="w-full flex gap-2 mb-3"
          variant="outline"
          onClick={() => {
            addLayer({
              id: crypto.randomUUID(),
              url: "",
              height: 0,
              width: 0,
              publicId: "",
              name: "",
              format: "",
            });
          }}
        >
          Create a Layer
          <Layers2 className="text-secondary-foreground" />
        </Button>
      </div>
    </Card>
  );
}
