"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Editor from "@/components/Editor";
import { ImageStore } from "@/zustand/imageStore";
import { LayerStore } from "@/zustand/layerStore";
import Lottie from "lottie-react";
import loadingAnimation from "@/public/animations/loading.json"

export default function Home() {
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  if (!user) {
    router.push("/api/auth/login");
  }
  const userId = user?.id;

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
          userId: userId!,
        }}
      >
        <main className="h-full">
          <Editor />
        </main>
      </LayerStore.Provider>
    </ImageStore.Provider>
  );
}
