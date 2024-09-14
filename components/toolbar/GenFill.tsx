"use client";

import { bgRemove } from "@/server/bgRemove";
import { useImageStore } from "@/zustand/imageStore";
import { useLayerStore } from "@/zustand/layerStore";
import { AnimatePresence, motion } from "framer-motion";
import { Crop } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { genFill } from "@/server/genFill";

export default function GenFill() {
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const removeLayer = useLayerStore((state) => state.removeLayer);
  const setGenerating = useImageStore((state) => state.setGenerating);
  const generating = useImageStore((state) => state.generating);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const PREVIEW_SIZE = 250;
  const EXPANSION_THRESHOLD = 250;

  const ExpansionIndicator = ({
    value,
    axis,
  }: {
    value: number;
    axis: "x" | "y";
  }) => {
    const isVisible = Math.abs(value) >= EXPANSION_THRESHOLD;
    const position =
      axis === "x"
        ? {
            top: "50%",
            [value > 0 ? "right" : "left"]: 0,
            transform: "translateY(-50%)",
          }
        : {
            left: "50%",
            [value > 0 ? "bottom" : "top"]: 0,
            transform: "translateX(-50%)",
          };

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute bg-primary text-blue-500 px-2 py-1 rounded-md text-xs font-bold"
            style={position}
          >
            {Math.abs(value)}px
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const previewStyle = useMemo(() => {
    if (!activeLayer.width || !activeLayer.height) return {};
    const newWidth = activeLayer.width + width;
    const newHeight = activeLayer.height + height;
    const scale = Math.min(PREVIEW_SIZE / newHeight, PREVIEW_SIZE / newWidth);
    return {
      width: `${newWidth * scale}px`,
      height: `${newHeight * scale}px`,
      backgroundImage: `url(${activeLayer.url})`,
      backgroundSize: `${activeLayer.width * scale}px ${activeLayer.height * scale}px`,
      backgroundPosition: `center`,
      backgroundRepeat: "no-repeat",
      position: "relative" as const,
    };
  }, [activeLayer, height, width]);

  const previewOverlayStyle = useMemo(() => {
    if (!activeLayer.width || !activeLayer.height) return {};
    const newWidth = activeLayer.width + width;
    const newHeight = activeLayer.height + height;
    const scale = Math.min(PREVIEW_SIZE / newHeight, PREVIEW_SIZE / newWidth);
    const leftWidth = width > 0 ? `${(width / 2) * scale}px` : "0";
    const rightWidth = width > 0 ? `${(width / 2) * scale}px` : "0";
    const topHeight = height > 0 ? `${(height / 2) * scale}px` : "0";
    const bottomHeight = height > 0 ? `${(height / 2) * scale}px` : "0";
    return {
      position: "absolute" as const,
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      boxShadow: `inset ${leftWidth} ${topHeight} 0 rgba(48, 119, 255, 1),
                    inset -${rightWidth} ${topHeight} 0 rgba(48, 119, 255, 1),
                    inset ${leftWidth} -${bottomHeight} 0 rgba(48, 119, 255, 1),
                    inset -${rightWidth} -${bottomHeight} 0 rgba(48, 119, 255,1)`,
    };
  }, [activeLayer, height, width]);

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="p-2 px-20">
          <span className="flex gap-1 items-center justify-center text-xs font-medium">
            Generative Fill <Crop size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="flex flex-col h-full">
          <div className="space-y-2">
            <h4 className="font-medium text-center py-2 leading-none">
              Generative Fill
            </h4>
            <p className="text-sm text-muted-foreground">
              Remove background of the image
            </p>
            {activeLayer.width && activeLayer.height ? (
              <div className="flex justify-evenly">
                <div className="flex flex-col items-center">
                  <span className="text-xs">Current Size:</span>
                  <p className="text-sm text-primary font-bold">
                    {activeLayer.width}X{activeLayer.height}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs">New Size:</span>
                  <p className="text-sm text-primary font-bold">
                    <Popover>
                      <PopoverTrigger>
                        {activeLayer.width + width}
                      </PopoverTrigger>
                      <PopoverContent>
                        <Input name="width" type="number" />
                      </PopoverContent>
                    </Popover>
                    X{activeLayer.height + height}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <div className="text-center">
              <Label htmlFor="maxWidth">Modify Width</Label>
              <Input
                name="width"
                type="range"
                max={activeLayer.width}
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
                className="h-8"
              />
            </div>
            <div className="text-center">
              <Label htmlFor="maxHeight">Modify Height</Label>
              <Input
                name="height"
                type="range"
                min={-activeLayer.height! + 100}
                max={activeLayer.height}
                value={height}
                step={2}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="h-8"
              />
            </div>
          </div>
          <div
            className="preview-container flex-grow"
            style={{
              width: `${PREVIEW_SIZE}px`,
              height: `${PREVIEW_SIZE}px`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              margin: "auto",
            }}
          >
            <div style={previewStyle}>
              <div className="animate-pulse " style={previewOverlayStyle}>
                <ExpansionIndicator value={width} axis="x" />
                <ExpansionIndicator value={height} axis="y" />
              </div>
            </div>
          </div>
        </div>
        <Button
          disabled={!activeLayer?.url || generating}
          onClick={async () => {
            const newLayerId = crypto.randomUUID();
            setGenerating(true);
            const res = await genFill({
              activeImage: activeLayer.url!,
              aspect : "1:1",
              height: activeLayer.height! + height,
              width: activeLayer.width! + width,
            });

            if (res?.data?.success) {
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: activeLayer.format,
                height: activeLayer.height! + height,
                width: activeLayer.width! + width,
                name: "gen-filled" + activeLayer.name,
                publicId: activeLayer.publicId,
                resourceType: "image",
              });
              setGenerating(false);
              setActiveLayer(newLayerId);
            }
            if (res?.serverError) {
              setGenerating(false);
            }
          }}
          className="w-full mt-4"
        >
          {generating ? "Generating ..." : "Generative Fill"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
