"use client";

import { bgRemove } from "@/server/bgRemove";
import { useImageStore } from "@/zustand/imageStore";
import { useLayerStore } from "@/zustand/layerStore";
import { Image, ImageOff } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function BGRemove() {
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const removeLayer = useLayerStore((state) => state.removeLayer);
  const setGenerating = useImageStore((state) => state.setGenerating);
  const generating = useImageStore((state) => state.generating);

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="p-8">
          <span className="flex gap-1 items-center justify-center text-xs font-medium">
            Background Removal <ImageOff size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Smart Background Remove
            </h4>
            <p className="text-sm text-muted-foreground">
              Remove background of the image
            </p>
          </div>
        </div>
        <Button
          disabled={!activeLayer?.url || generating}
          onClick={async () => {
            const newLayerId = crypto.randomUUID();
            setGenerating(true);
            const res = await bgRemove({
              activeImage: activeLayer.url!,
              format: activeLayer.format!,
            });

            if (res?.data?.success) {
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: "png",
                height: activeLayer.height,
                width: activeLayer.width,
                name: "bgRemoved" + activeLayer.name,
                publicId: activeLayer.publicId,
                resourceType: "image",
              });
              setGenerating(false);
              setActiveLayer(newLayerId);
            }
            if(res?.serverError){
              setGenerating(false);
            }
          }}
          className="w-full mt-4"
        >
          {generating ? "Removing ..." : "Remove Background 🎨"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
