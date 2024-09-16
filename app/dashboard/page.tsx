"use client";
import { useEffect, useState } from "react";
import loadingAnimation from "@/public/animations/loading.json";
import { ImageStore } from "@/zustand/imageStore";
import { LayerStore } from "@/zustand/layerStore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Editor from "@/components/Editor";


const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useKindeBrowserClient();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  if (isLoading) {
    return <Lottie animationData={loadingAnimation} loop={true} />;
  }

  if (!user) {
    router.push("/api/auth/login");
    return null; // Prevent further rendering
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
