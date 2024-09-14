"use client";

import { genRemove } from "@/server/genRemove";
import { useImageStore } from "@/zustand/imageStore";
import { useLayerStore } from "@/zustand/layerStore";
import { Eraser } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function GenRemove() {
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const removeLayer = useLayerStore((state) => state.removeLayer);
  const setGenerating = useImageStore((state) => state.setGenerating);
  const generating = useImageStore((state) => state.generating);
  const [activeTag, setActiveTag] = useState("");

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="p-2 px-20">
          <span className="flex gap-1 items-center justify-center  text-xs font-medium">
            Content Aware <Eraser size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Smart AI Remove</h4>
            <p className="text-sm text-muted-foreground">
              Generative Remove any part of the image
            </p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="selection">Selection</Label>
            <Input
              className="col-span-2 h-8"
              value={activeTag}
              name="tag"
              onChange={(e) => {
                setActiveTag(e.target.value);
              }}
            />
          </div>
        </div>
        <Button
        disabled={!activeLayer?.url || !activeTag || generating}
          onClick={async () => {
            const newLayerId = crypto.randomUUID();
            setGenerating(true);
            const res = await genRemove({
              prompt: activeTag,
              activeImage: activeLayer.url!,
            });

            if (res?.data?.success) {
              setGenerating(false);
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: activeLayer.format,
                height: activeLayer.height,
                width: activeLayer.width,
                name: "genRemoved" + activeLayer.name,
                publicId: activeLayer.publicId,
                resourceType: "image",
              });
              setActiveLayer(newLayerId);
            }
            if(res?.serverError){
              setGenerating(false);
            }
          }}
          className="w-full mt-4"
        >
          Magic Remove🎨
        </Button>
      </PopoverContent>
    </Popover>
  );
}
