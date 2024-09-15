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
  const { user, isLoading } = useKindeBrowserClient(); // Added isLoading
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/api/auth/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <Lottie animationData={loadingAnimation} loop={true} />;
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
