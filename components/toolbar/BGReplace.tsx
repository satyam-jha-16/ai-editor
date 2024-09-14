"use client";

import { bgRemove } from "@/server/bgRemove";
import { useImageStore } from "@/zustand/imageStore";
import { useLayerStore } from "@/zustand/layerStore";
import { Image, ImageOff } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { bgReplace } from "@/server/bgReplace";

export default function BGReplace() {
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const removeLayer = useLayerStore((state) => state.removeLayer);
  const setGenerating = useImageStore((state) => state.setGenerating);
  const generating = useImageStore((state) => state.generating);

  const [prompt, setPrompt] = useState("");
  
  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="p-8">
          <span className="flex gap-1 items-center justify-center text-xs font-medium">
            Background Replace <Image size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Generative Background Replace
            </h4>
            <p className="text-sm text-muted-foreground">
              Replace background of your Image with AI generated background.
            </p>
          </div>
        </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
                         <Label htmlFor="prompt">Prompt (optional)</Label>
                         <Input
                           id="prompt"
                           value={prompt}
                           onChange={(e) => setPrompt(e.target.value)}
                           placeholder="Describe the new background"
                           className="col-span-2 h-8"
                         />
                       </div>
        </div>
        <Button
          disabled={!activeLayer?.url || generating}
          onClick={async () => {
            const newLayerId = crypto.randomUUID();
            setGenerating(true);
            const res = await bgReplace({
              activeImage: activeLayer.url!,
              prompt: prompt,
            });

            if (res?.data?.success) {
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: activeLayer.format,
                height: activeLayer.height,
                width: activeLayer.width,
                name: "bg-replaced" + activeLayer.name,
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
          {generating ? "Generating ..." : "Replace Background 🎨"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
