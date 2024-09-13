"use client";
import Editor from "@/components/Editor";
import { ImageStore } from "@/zustand/imageStore";
import { LayerStore } from "@/zustand/layerStore";

export default function Home() {
  return (
    <ImageStore.Provider initialValue={{ generating: false }}>
      <LayerStore.Provider
        initialValue={{
          layerComparisonMode: false,
          layers: [
            {
              id: crypto.randomUUID(),
              url: "",
              height: 0,
              width: 0,
              publicId: "",
            },
          ],
        }}
      >
        <main className="h-full">
          <Editor />

        </main>
      </LayerStore.Provider>
    </ImageStore.Provider>
  );
}
