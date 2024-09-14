"use client";

import { cn } from "@/lib/utils";
import { useImageStore } from "@/zustand/imageStore";
import { useLayerStore } from "@/zustand/layerStore";
import { ArrowRight, Layers2, Layers as Layertag } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
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
  const layerComparisonMode = useLayerStore(
    (state) => state.layerComparisonMode,
  );
  const setLayerComparisonMode = useLayerStore(
    (state) => state.setLayerComparisonMode,
  );
  const comparedLayers = useLayerStore((state) => state.comparedLayers);
  const setComparedLayers = useLayerStore((state) => state.setComparedLayers);
  const toggleComparedLayers = useLayerStore(
    (state) => state.toggleComparedLayer,
  );

  const getLayerName = useMemo(
    () => (id: string) => {
      const layer = layers.find((layer) => layer.id === id);
      return layer ? layer.url : "Nothing to see here";
    },
    [layers],
  );

  const visibleLayers = useMemo(
    () =>
      layerComparisonMode
        ? layers.filter((layer) => layer.url && layer.resourceType === "image")
        : layers,
    [layerComparisonMode, layers],
  );
  return (
    <Card className="basis-[320px] shrink-0  scrollbar-thin scrollbar-track-secondary overflow-y-scroll scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-hidden relative flex flex-col shadow-2xl">
      <CardHeader className="sticky top-0 z-50 px-4 py-6  min-h-28 bg-card shadow-sm">
        {layerComparisonMode ? (
          <div>
            <CardTitle className="text-sm pb-2">Comparing...</CardTitle>
            <CardDescription className="flex gap-2 items-center">
              <Image
                alt="compare"
                width={32}
                height={32}
                src={getLayerName(comparedLayers[0]) as string}
              />
              {comparedLayers.length > 0 && <ArrowRight />}
              {comparedLayers.length > 1 ? (
                <Image
                  alt="compare"
                  width={32}
                  height={32}
                  src={getLayerName(comparedLayers[1]) as string}
                />
              ) : (
                "Nothing here"
              )}
            </CardDescription>
          </div>
        ) : (
          <div className="flex flex-col gap-1 ">
            <CardTitle className="text-sm ">
              {activeLayer.name || "Layers"}
            </CardTitle>
            {activeLayer.width && activeLayer.height ? (
              <CardDescription className="text-xs">
                {activeLayer.width}X{activeLayer.height}
              </CardDescription>
            ) : null}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {visibleLayers.map((layer, i) => (
          <div
            key={layer.id}
            className={cn(
              "cursor-pointer ease-in-out hover:bg-secondary border border-transparent",
              {
                "animate-pulse": generating,
                "border-primary": layerComparisonMode ? comparedLayers.includes(layer.id) : activeLayer.id === layer.id,
              },
            )}
            onClick={() => {
              if (generating) return;
              if (layerComparisonMode) {
                toggleComparedLayers(layer.id)
              } else {
                setActiveLayer(layer.id);
              }
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
            const new_id = crypto.randomUUID();
            addLayer({
              id: new_id,
              url: "",
              height: 0,
              width: 0,
              publicId: "",
              name: "",
              format: "",
            });
            setActiveLayer(new_id);
          }}
        >
          Create a Layer
          <Layers2 className="text-secondary-foreground" />
        </Button>
        <Button
          className="w-full flex gap-2 mb-3"
          variant={layerComparisonMode ? "destructive" : "outline"}
          disabled={!activeLayer.url || activeLayer.resourceType === "video"}
          onClick={() => {
            if (layerComparisonMode) {
              setLayerComparisonMode(!layerComparisonMode);
            } else {
              setComparedLayers([activeLayer.id]);
            }
          }}
        >
          <span>
            {" "}
            {layerComparisonMode ? "Stop Comparing" : "Compare Layers"}
          </span>
          {!layerComparisonMode ? (
            <Layertag className="text-secondary-foreground" />
          ) : null}
        </Button>
      </div>
    </Card>
  );
}
