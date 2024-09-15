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
  const { isLoading, isAuthenticated, user } = useKindeBrowserClient();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/api/auth/login");
    } else if (isAuthenticated && user) {
      setUserId(user.id);
    }
  }, [isLoading, isAuthenticated, router, user]);

  if (isLoading || !userId) {
    return <div className="flex justify-center items-center"> <Lottie className="w-36" animationData={loadingAnimation} /></div>;
  }

  if (!isAuthenticated) {
    return null; // or a custom unauthorized message
  }

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
          userId: userId,
        }}
      >
        <main className="h-full">
          <Editor />
        </main>
      </LayerStore.Provider>
    </ImageStore.Provider>
  );
}
